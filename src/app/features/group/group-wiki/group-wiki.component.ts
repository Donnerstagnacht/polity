import {Component, effect, signal, Signal, WritableSignal} from '@angular/core';
import {CounterComponent} from "../../../ui/polity-wiki/counter/counter.component";
import {FollowButton} from "../../../ui/polity-wiki/follow-button/follow-button.component";
import {RequestButton} from "../../../ui/polity-wiki/request-button/request-button.component";
import {WikiHeadlineComponent} from "../../../ui/polity-wiki/wiki-headline/wiki-headline.component";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupStoreService} from "../action-store-service/group.store.service";
import {GroupCountersActionService} from "../../group-follow/action-store-services/group-counters.action.service";
import {GroupCountersStoreService} from "../../group-follow/action-store-services/group-counters.store.service";
import {GroupMemberActionService} from "../../group_member/action-store-services/group-member.action.service";

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
    protected groupCounter: WritableSignal<SupabaseObjectReturn<'read_group_following_counter'> | null> = signal(null);

    protected isFollowingCheckLoading: WritableSignal<boolean> = signal(false);
    protected isFollowing: WritableSignal<boolean> = signal(false);

    protected isGroupMembershipStatusLoading: WritableSignal<boolean> = signal(false);
    protected isMember: WritableSignal<boolean> = signal(false);
    protected isBoardMember: WritableSignal<boolean> = signal(false);
    protected isRequested: WritableSignal<boolean> = signal(false);
    protected isInvited: WritableSignal<boolean> = signal(false);
    protected isNoMember: WritableSignal<boolean> = signal(true);
    protected buttonTextString: string = 'Request Membership';

    constructor(
        private groupStoreService: GroupStoreService,
        private groupCountersStoreService: GroupCountersStoreService,
        private groupCountersActionService: GroupCountersActionService,
        private groupMemberActionService: GroupMemberActionService
    ) {
        effect((): void => {
            if (this.isNoMember()) {
                this.buttonTextString = 'Request Membership';
            } else if (this.isMember() || this.isBoardMember()) {
                this.buttonTextString = 'Leave Group';
            } else if (this.isRequested()) {
                this.buttonTextString = 'Withdraw request';
            } else if (this.isInvited()) {
                this.buttonTextString = 'Accept invitation';
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
            await this.groupMemberActionService.accceptGroupInvitation();
        }
    }
}
