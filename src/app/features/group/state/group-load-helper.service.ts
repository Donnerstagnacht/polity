import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {NAVIGATION_ITEMS_GROUP_BOARD_MEMBER} from '@polity-group/group-navigation-board-member';
import {NAVIGATION_ITEMS_GROUP} from '@polity-group/group-navigation-signed-in';
import {NavigationItem} from '@polity-navigation/types-and-interfaces/navigationItem';
import {GroupStore} from '@polity-group/state/group.store.';
import {GroupCounterStore} from '@polity-group/group-follow-state/group-counter.store';
import {GroupFollowStore} from '@polity-group/group-follow-state/group-follow.store';
import {GroupMembershipStatusStore} from '@polity-group/group-member-state/group-membership-status.store';

@Injectable({
    providedIn: 'root'
})
export class GroupLoadHelperService {
    private menuItemsGroup_: NavigationItem[] = NAVIGATION_ITEMS_GROUP;
    public menuItemsGroup: WritableSignal<NavigationItem[]> = signal(this.menuItemsGroup_);
    private groupStore: GroupStore = inject(GroupStore);
    private groupMembershipStatusStore: GroupMembershipStatusStore = inject(GroupMembershipStatusStore);
    private groupFollowStore: GroupFollowStore = inject(GroupFollowStore);
    private groupCounterStore: GroupCounterStore = inject(GroupCounterStore);

    public async loadData(urlId: string): Promise<void> {
        console.log(urlId);
        await this.groupMembershipStatusStore.read(urlId);
        await Promise.all([
            this.checkMemberStatus(urlId),
            this.groupStore.read(urlId),
            this.groupCounterStore.read(urlId),
            this.groupFollowStore.checkIfFollowing(urlId)
        ]);
    }

    private async checkMemberStatus(urlId: string): Promise<void> {
        console.log('check');
        console.log(urlId);
        console.log(this.groupMembershipStatusStore.isBoardMember());
        if (this.groupMembershipStatusStore.isBoardMember()) {
            this.menuItemsGroup_ = NAVIGATION_ITEMS_GROUP_BOARD_MEMBER;
            this.menuItemsGroup_[0].link = '/group/' + urlId;
            this.menuItemsGroup_[1].link = '/group/' + urlId + '/edit';
            this.menuItemsGroup.set(this.menuItemsGroup_);
        } else {
            this.menuItemsGroup_ = NAVIGATION_ITEMS_GROUP;
            this.menuItemsGroup_[0].link = '/group/' + urlId;
            this.menuItemsGroup.set(this.menuItemsGroup_);
        }
    }
}
