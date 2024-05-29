import {Component, effect, Inject, Injector, signal, Signal, WritableSignal} from '@angular/core';
import {CounterComponent} from "../../../ui/polity-wiki/counter/counter.component";
import {FollowButton} from "../../../ui/polity-wiki/follow-button/follow-button.component";
import {RequestButton} from "../../../ui/polity-wiki/request-button/request-button.component";
import {WikiHeadlineComponent} from "../../../ui/polity-wiki/wiki-headline/wiki-headline.component";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupStoreService} from "../action-store-service/group.store.service";
import {GroupCountersActionService} from "../../group-follow/action-store-services/group-counters.action.service";
import {GroupCountersStoreService} from "../../group-follow/action-store-services/group-counters.store.service";
import {GroupMemberActionService} from "../../group_member/action-store-services/group-member.action.service";
import {TuiDialogService} from "@taiga-ui/core";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {
    GroupAcceptDeclineMembershipComponent
} from "../../group_member/group-accept-decline-membership/group-accept-decline-membership.component";

@Component({
    selector: 'polity-group-wiki',
    standalone: true,
    imports: [
        CounterComponent,
        FollowButton,
        RequestButton,
        WikiHeadlineComponent
    ],
    templateUrl: './group-wiki.component.html',
    styleUrl: './group-wiki.component.less'
})
export class GroupWikiComponent {
    protected isGroupLoading: WritableSignal<boolean> = signal(true);
    protected group: Signal<SupabaseObjectReturn<'read_group_columns'> | null> = signal(null);

    protected isGroupCounterLoading: WritableSignal<boolean> = signal(true);
    protected groupCounter: WritableSignal<SupabaseObjectReturn<'read_group_counters'> | null> = signal(null);

    protected isFollowingCheckLoading: WritableSignal<boolean> = signal(false);
    protected isFollowing: WritableSignal<boolean> = signal(false);

    protected isGroupMembershipStatusLoading: WritableSignal<boolean> = signal(false);
    protected isMember: WritableSignal<boolean> = signal(false);
    protected isBoardMember: WritableSignal<boolean> = signal(false);
    protected isRequested: WritableSignal<boolean> = signal(false);
    protected isInvited: WritableSignal<boolean> = signal(false);
    protected isNoMember: WritableSignal<boolean> = signal(true);
    protected buttonTextString: string = 'Request Membership';

    private readonly dialog = this.dialogService.open<string>(
        new PolymorpheusComponent(GroupAcceptDeclineMembershipComponent, this.injector),
        {
            // data: 237,
            dismissible: true,
            label: 'Heading',
        },
    );

    constructor(
        private groupStoreService: GroupStoreService,
        private groupCountersStoreService: GroupCountersStoreService,
        private groupCountersActionService: GroupCountersActionService,
        private groupMemberActionService: GroupMemberActionService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private injector: Injector
    ) {
        effect((): void => {
            if (this.isNoMember()) {
                this.buttonTextString = 'Request Membership';
            } else if (this.isMember() || this.isBoardMember()) {
                this.buttonTextString = 'Leave Group';
            } else if (this.isRequested()) {
                this.buttonTextString = 'Withdraw request';
            } else if (this.isInvited()) {
                this.buttonTextString = 'Answer invitation';
            }
        });
    }

    async ngOnInit(): Promise<void> {
        this.isGroupLoading = this.groupStoreService.group.loading.getLoading();
        this.group = this.groupStoreService.group.getObject();

        this.isFollowingCheckLoading = this.groupStoreService.group.uiFlagStore.getFlag('isFollowingCheckLoading');
        this.isFollowing = this.groupStoreService.group.uiFlagStore.getFlag('isFollowing');

        this.isGroupCounterLoading = this.groupCountersStoreService.groupCounters.loading.getLoading();
        this.groupCounter = this.groupCountersStoreService.groupCounters.getObject();

        this.isGroupMembershipStatusLoading = this.groupStoreService.group.uiFlagStore.getFlag('isGroupMembershipStatusLoading');
        this.isMember = this.groupStoreService.group.uiFlagStore.getFlag('isMember');
        this.isBoardMember = this.groupStoreService.group.uiFlagStore.getFlag('isBoardMember');
        this.isRequested = this.groupStoreService.group.uiFlagStore.getFlag('isRequested');
        this.isInvited = this.groupStoreService.group.uiFlagStore.getFlag('isInvited');
        this.isNoMember = this.groupStoreService.group.uiFlagStore.getFlag('isNotMember');
    }

    async toggleFollow(newIsFollowing: boolean): Promise<void> {
        if (newIsFollowing) {
            console.log('follow')
            this.isFollowing.set(true);
            await this.groupCountersActionService.followGroup();
        } else {
            console.log('unfollow')
            this.isFollowing.set(false);
            await this.groupCountersActionService.unFollowGroup();
        }
    }

    async toggleMembership(newIsMember: boolean): Promise<void> {
        if (this.isNoMember()) {
            await this.groupMemberActionService.requestGroupMembership();
        } else if (this.isMember() || this.isBoardMember()) {
            await this.groupMemberActionService.leaveGroup();
        } else if (this.isRequested()) {
            await this.groupMemberActionService.withDrawGroupRequest();
        } else if (this.isInvited()) {
            this.showDialog()
            //TODO open dialog
            //TODO check if accepted
            // await this.groupMemberActionService.accceptGroupInvitation();
            //TODO check if not accepted
            // await this.groupMemberActionService.declineGroupInvitation();
        }
    }

    private showDialog(): void {
        this.dialog.subscribe({
            next: data => {
                console.info(`Dialog emitted data = ${data}`);
                if (data === 'accept') {
                    this.groupMemberActionService.accceptGroupInvitation();
                } else if (data === 'decline') {
                    this.groupMemberActionService.declineGroupInvitation();
                }
            },
            complete: () => {
                console.info('Dialog closed');
            },
        });
    }
}
