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
    protected group: Signal<SupabaseObjectReturn<'read_group_columns'> | null> = signal(null);
    protected isGroupLoading: WritableSignal<boolean> = signal(true);
    protected isGroupMemberLoading: WritableSignal<boolean> = signal(false);
    protected isGroupMember: WritableSignal<boolean> = signal(false);
    protected groupCounter: WritableSignal<SupabaseObjectReturn<'read_group_following_counter'> | null> = signal(null);
    protected isGroupCounterLoading: WritableSignal<boolean> = signal(true);

    protected isFollowingCheckLoading: WritableSignal<boolean> = signal(false);
    protected isFollowing: WritableSignal<boolean> = signal(false);
    protected memberStatus: WritableSignal<string> = signal('no_member');
    protected buttonText: string = 'Request Membership';

    constructor(
        private groupStoreService: GroupStoreService,
        private groupCountersStoreService: GroupCountersStoreService,
        private groupCountersActionService: GroupCountersActionService,
        private groupMemberActionService: GroupMemberActionService
    ) {
        effect((): void => {
            console.log('status', this.memberStatus())
            console.log(this.buttonText)
            if (this.memberStatus() === 'member' || this.memberStatus() === 'board_member') {
                this.buttonText = 'Leave Group';
            } else if (this.memberStatus() === 'requested') {
                console.log('requested')
                this.buttonText = 'Withdraw request';
                console.log(this.buttonText)
            } else if (this.memberStatus() === 'invited') {
                this.buttonText = 'Accept invitation';
            } else {
                this.buttonText = 'Request Membership';
            }
        });
    }

    async ngOnInit(): Promise<void> {
        this.group = this.groupStoreService.group.getObject();
        this.groupCounter = this.groupCountersStoreService.groupCounters.getObject();
        this.memberStatus = this.groupStoreService.groupMemberStatus;

        this.isGroupLoading = this.groupStoreService.group.loading.getLoading();
        this.isGroupCounterLoading = this.groupCountersStoreService.groupCounters.loading.getLoading();
        this.isFollowingCheckLoading = this.groupStoreService.group.uiFlagStore.getUiFlag('isFollowingCheckLoading');
        this.isFollowing = this.groupStoreService.group.uiFlagStore.getUiFlag('isFollowing');
        this.isGroupMember = this.groupStoreService.group.uiFlagStore.getUiFlag('isMember');
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
        if (this.memberStatus() === 'no_member') {
            await this.groupMemberActionService.requestGroupMembership();
        } else if (this.memberStatus() === 'requested') {
            await this.groupMemberActionService.withDrawGroupRequest();
        } else if (this.memberStatus() === 'invited') {
            await this.groupMemberActionService.declineGroupInvitation();
        } else if (this.memberStatus() === 'board_member' || this.memberStatus() === 'member') {
            await this.groupMemberActionService.leaveGroup();
        }
    }
}
