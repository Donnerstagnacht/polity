import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {NAVIGATION_ITEMS_GROUP} from '../group-navigation-signed-in';
import {NAVIGATION_ITEMS_GROUP_BOARD_MEMBER} from '../group-navigation-board-member';
import {GroupStore} from '../state/group.store.';
import {SecondBarTopComponent} from '@polity-navigation/second-bar/second-bar-top/second-bar-top.component';
import {SecondBarRightComponent} from '@polity-navigation/second-bar/second-bar-right/second-bar-right.component';
import {NavigationItem} from '@polity-navigation/types-and-interfaces/navigationItem';
import {WikiHeadlineComponent} from '@polity-ui/polity-wiki/wiki-headline/wiki-headline.component';
import {FollowButton} from '@polity-ui/polity-wiki/follow-button/follow-button.component';
import {RequestButton} from '@polity-ui/polity-wiki/request-button/request-button.component';
import {CounterComponent} from '@polity-ui/polity-wiki/counter/counter.component';
import {GroupWikiPage} from '@polity-group/group-wiki-page/group-wiki.page';
import {GroupCounterStore} from '@polity-group/group-follow-state/group-counter.store';
import {GroupFollowStore} from '@polity-group/group-follow-state/group-follow.store';
import {GroupMembershipStatusStore} from '@polity-group/group-member-state/group-membership-status.store';

@Component({
    selector: 'polity-group',
    standalone: true,
    imports: [
        WikiHeadlineComponent,
        FollowButton,
        RequestButton,
        CounterComponent,
        GroupWikiPage,
        RouterOutlet,
        SecondBarTopComponent,
        SecondBarRightComponent
    ],
    templateUrl: './group.router.html',
    styleUrl: './group.router.less'
})
export class GroupRouter {
    protected groupStore: GroupStore = inject(GroupStore);
    protected groupMembershipStatusStore: GroupMembershipStatusStore = inject(GroupMembershipStatusStore);
    protected groupCounterStore: GroupCounterStore = inject(GroupCounterStore);
    protected groupFollowStore: GroupFollowStore = inject(GroupFollowStore);
    protected menuItemsGroup: NavigationItem[] = NAVIGATION_ITEMS_GROUP;

    constructor(private route: ActivatedRoute) {
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
