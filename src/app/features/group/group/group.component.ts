import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {WikiHeadlineComponent} from '../../../ui/polity-wiki/wiki-headline/wiki-headline.component';
import {FollowButton} from '../../../ui/polity-wiki/follow-button/follow-button.component';
import {RequestButton} from '../../../ui/polity-wiki/request-button/request-button.component';
import {CounterComponent} from '../../../ui/polity-wiki/counter/counter.component';
import {GroupWikiComponent} from '../group-wiki/group-wiki.component';
import {NAVIGATION_ITEMS_GROUP} from '../group-navigation-signed-in';
import {NAVIGATION_ITEMS_GROUP_BOARD_MEMBER} from '../group-navigation-board-member';
import {GroupCounterStore} from '../../group-follow/state/group-counter.store';
import {GroupFollowStore} from '../../group-follow/state/group-follow.store';
import {GroupStore} from '../state/group.store.';
import {GroupMembershipStatusStore} from '../../group_member/state/group-membership-status.store';
import {SecondBarTopComponent} from '@polity-navigation/second-bar/second-bar-top/second-bar-top.component';
import {SecondBarRightComponent} from '@polity-navigation/second-bar/second-bar-right/second-bar-right.component';
import {NavigationItem} from '@polity-navigation/types-and-interfaces/navigationItem';

@Component({
    selector: 'polity-group',
    standalone: true,
    imports: [
        WikiHeadlineComponent,
        FollowButton,
        RequestButton,
        CounterComponent,
        GroupWikiComponent,
        RouterOutlet,
        SecondBarTopComponent,
        SecondBarRightComponent
    ],
    templateUrl: './group.component.html',
    styleUrl: './group.component.less'
})
export class GroupComponent {
    protected groupStore: GroupStore = inject(GroupStore);
    protected groupMembershipStatusStore: GroupMembershipStatusStore = inject(GroupMembershipStatusStore);
    protected groupCounterStore: GroupCounterStore = inject(GroupCounterStore);
    protected groupFollowStore: GroupFollowStore = inject(GroupFollowStore);
    protected menuItemsGroup: NavigationItem[] = NAVIGATION_ITEMS_GROUP;

    constructor(
        private route: ActivatedRoute
    ) {

    }

    async ngOnInit(): Promise<void> {
        const urlId: string = this.route.snapshot.params['id'];
        this.menuItemsGroup[0].link = '/group/' + urlId;
        this.checkMemberStatus(urlId);
        await Promise.all([
            this.groupStore.read(urlId),
            this.groupCounterStore.read(urlId)
        ]);
        await this.groupFollowStore.checkIfFollowing(urlId);
    }

    private async checkMemberStatus(urlId: string): Promise<void> {
        await this.groupMembershipStatusStore.read(urlId);
        if (this.groupMembershipStatusStore.isBoardMember()) {
            this.menuItemsGroup = NAVIGATION_ITEMS_GROUP_BOARD_MEMBER;
            this.menuItemsGroup[0].link = '/group/' + urlId;
            this.menuItemsGroup[1].link = '/group/' + urlId + '/edit';
        } else {
            this.menuItemsGroup = NAVIGATION_ITEMS_GROUP;
            this.menuItemsGroup[0].link = '/group/' + urlId;
        }
    }
}
