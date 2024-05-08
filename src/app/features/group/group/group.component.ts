import {Component} from '@angular/core';
import {GroupActionService} from "../action-store-service/group.action.service";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {WikiHeadlineComponent} from "../../../ui/polity-wiki/wiki-headline/wiki-headline.component";
import {FollowButton} from "../../../ui/polity-wiki/follow-button/follow-button.component";
import {RequestButton} from "../../../ui/polity-wiki/request-button/request-button.component";
import {CounterComponent} from "../../../ui/polity-wiki/counter/counter.component";
import {GroupWikiComponent} from "../group-wiki/group-wiki.component";
import {GroupCountersActionService} from "../../group-follow/action-store-services/group-counters.action.service";
import {GroupStoreService} from "../action-store-service/group.store.service";
import {GroupCountersStoreService} from "../../group-follow/action-store-services/group-counters.store.service";
import {SecondBarTopComponent} from "../../../navigation/second-bar-top/second-bar-top.component";
import {SecondBarRightComponent} from "../../../navigation/second-bar-right/second-bar-right.component";
import {NavigationItem} from "../../../navigation/types-and-interfaces/navigationItem";
import {NAVIGATION_ITEMS_GROUP} from "../group-navigation-signed-in";
import {NAVIGATION_ITEMS_GROUP_BOARD_MEMBER} from "../group-navigation-board-member";

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
    protected menuItemsGroup: NavigationItem[] = NAVIGATION_ITEMS_GROUP;

    constructor(
        private groupActionService: GroupActionService,
        private groupCountersActionService: GroupCountersActionService,
        private groupStoreService: GroupStoreService,
        private groupCountersStoreService: GroupCountersStoreService,
        private route: ActivatedRoute
    ) {

    }

    async ngOnInit(): Promise<void> {
        const urlId: string = this.route.snapshot.params['id'];
        this.menuItemsGroup[0].link = '/group/' + urlId;
        this.checkIfBoardMember(urlId);

        await Promise.all([
            this.groupActionService.readGroup(urlId),
            this.groupCountersActionService.selectGroupCounter(urlId)
        ])
        await this.groupCountersActionService.checkIfFollowing();
        console.log(urlId)
    }

    ngOnDestroy(): void {
        this.groupStoreService.group.resetObject();
        this.groupCountersStoreService.groupCounters.resetObject()
    }

    private checkIfBoardMember(urlId: string): void {
        // TODO
        if (true) {
            this.menuItemsGroup = NAVIGATION_ITEMS_GROUP_BOARD_MEMBER
            this.menuItemsGroup[0].link = '/group/' + urlId
            this.menuItemsGroup[1].link = '/group/' + urlId + '/edit'
            this.menuItemsGroup[2].link = '/group/' + urlId + '/follower/edit'
        } else {
            this.menuItemsGroup = NAVIGATION_ITEMS_GROUP
            this.menuItemsGroup[0].link = '/group/' + urlId
        }
    }
}