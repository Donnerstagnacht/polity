import {Component, effect, inject, Inject, Injector, signal} from '@angular/core';
import {CounterComponent} from '../../../ui/polity-wiki/counter/counter.component';
import {FollowButton} from '../../../ui/polity-wiki/follow-button/follow-button.component';
import {RequestButton} from '../../../ui/polity-wiki/request-button/request-button.component';
import {WikiHeadlineComponent} from '../../../ui/polity-wiki/wiki-headline/wiki-headline.component';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {
    GroupAcceptDeclineMembershipComponent
} from '../../group_member/group-accept-decline-membership/group-accept-decline-membership.component';
import {GroupCounterStore} from '../../group-follow/store/group-counter.store';
import {GroupFollowStore} from '../../group-follow/store/group-follow.store';
import {GroupStore} from '../store/group.store.';
import {GroupMembershipStatusStore} from '../../group_member/store/group-membership-status.store';
import {GroupRequestsStore} from '../../group_member/store/group-requests.store';
import {GroupInvitationsStore} from '../../group_member/store/group-invitations.store';
import {GroupMembersStore} from '../../group_member/store/group-members.store';

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
    protected groupStore: GroupStore = inject(GroupStore);
    protected groupCounterStore: GroupCounterStore = inject(GroupCounterStore);
    protected groupFollowStore: GroupFollowStore = inject(GroupFollowStore);
    protected groupInvitationsStore: GroupInvitationsStore = inject(GroupInvitationsStore);
    protected groupMembershipStatusStore: GroupMembershipStatusStore = inject(GroupMembershipStatusStore);
    protected groupRequestsStore: GroupRequestsStore = inject(GroupRequestsStore);
    protected groupMembersStore: GroupMembersStore = inject(GroupMembersStore);

    // protected isGroupLoading: WritableSignal<boolean> = signal(true);
    // protected group: Signal<SupabaseObjectReturn<'read_group'> | null> = signal(null);

    // protected isGroupCounterLoading: WritableSignal<boolean> = signal(true);
    // protected groupCounter: WritableSignal<SupabaseObjectReturn<'read_group_counters'> | null> = signal(null);

    // protected isFollowingCheckLoading: WritableSignal<boolean> = signal(false);
    // protected isFollowing: WritableSignal<boolean> = signal(false);

    // protected isGroupMembershipStatusLoading: WritableSignal<boolean> = signal(false);
    // protected isMember: WritableSignal<boolean> = signal(false);
    // protected isBoardMember: WritableSignal<boolean> = signal(false);
    // protected isRequested: WritableSignal<boolean> = signal(false);
    // protected isInvited: WritableSignal<boolean> = signal(false);
    // protected isNoMember: WritableSignal<boolean> = signal(true);
    protected buttonTextString: string = 'Request Membership';
    protected readonly signal = signal;
    // protected readonly GroupMembershipStatusStore = GroupMembershipStatusStore;
    private readonly dialog = this.dialogService.open<string>(
        new PolymorpheusComponent(GroupAcceptDeclineMembershipComponent, this.injector),
        {
            // data: 237,
            dismissible: true,
            label: 'Heading'
        }
    );

    constructor(
        // private groupStoreService: GroupStoreService,
        // private groupCountersStoreService: GroupCountersStoreService,
        // private groupCountersActionService: GroupCountersActionService,
        // private groupMemberActionService: GroupMemberActionService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private injector: Injector
    ) {
        effect((): void => {
            if (this.groupMembershipStatusStore.isNoMember()) {
                this.buttonTextString = 'Request Membership';
            } else if (this.groupMembershipStatusStore.isMember() || this.groupMembershipStatusStore.isBoardMember()) {
                this.buttonTextString = 'Leave Group';
            } else if (this.groupMembershipStatusStore.isRequested()) {
                this.buttonTextString = 'Withdraw request';
            } else if (this.groupMembershipStatusStore.isInvited()) {
                this.buttonTextString = 'Answer invitation';
            }

        });


        // effect(() => {
        //     // console.log('followStatus component', this.groupStore.data());
        //     console.log('followStatus component', this.groupFollowStore.data());
        // });
    }

    async ngOnInit(): Promise<void> {
        // this.isGroupLoading = this.groupStoreService.group.loading.getLoading();
        // this.group = this.groupStoreService.group.getObject();

        // this.isFollowingCheckLoading = this.groupStoreService.group.uiFlagStore.getFlag('isFollowingCheckLoading');
        // this.isFollowing = this.groupStoreService.group.uiFlagStore.getFlag('isFollowing');

        // this.isGroupCounterLoading = this.groupCountersStoreService.groupCounters.loading.getLoading();
        // this.groupCounter = this.groupCountersStoreService.groupCounters.getObject();

        // this.isGroupMembershipStatusLoading = this.groupStoreService.group.uiFlagStore.getFlag('isGroupMembershipStatusLoading');
        // this.isMember = this.groupStoreService.group.uiFlagStore.getFlag('isMember');
        // this.isBoardMember = this.groupStoreService.group.uiFlagStore.getFlag('isBoardMember');
        // this.isRequested = this.groupStoreService.group.uiFlagStore.getFlag('isRequested');
        // this.isInvited = this.groupStoreService.group.uiFlagStore.getFlag('isInvited');
        // this.isNoMember = this.groupStoreService.group.uiFlagStore.getFlag('isNotMember');
    }

    async toggleFollow(newIsFollowing: boolean): Promise<void> {
        if (newIsFollowing) {
            // console.log('follow');
            // this.isFollowing.set(true);
            await this.groupFollowStore.follow();
        } else {
            // console.log('unfollow');
            // this.isFollowing.set(false);
            await this.groupFollowStore.unFollow();
        }
    }

    async toggleMembership(newIsMember: boolean): Promise<void> {
        if (this.groupMembershipStatusStore.isNoMember()) {
            await this.groupRequestsStore.request();
            // await this.groupMemberActionService.requestGroupMembership();
        } else if (this.groupMembershipStatusStore.isMember() || this.groupMembershipStatusStore.isBoardMember()) {
            await this.groupMembersStore.leave();
        } else if (this.groupMembershipStatusStore.isRequested()) {
            await this.groupRequestsStore.withdraw();
            // await this.groupMemberActionService.withDrawGroupRequest();
        } else if (this.groupMembershipStatusStore.isInvited()) {
            this.showDialog();
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
                    this.groupInvitationsStore.accept();
                } else if (data === 'decline') {
                    this.groupInvitationsStore.decline();
                    // this.groupMemberActionService.declineGroupInvitation();
                }
            },
            complete: () => {
                console.info('Dialog closed');
            }
        });
    }
}
