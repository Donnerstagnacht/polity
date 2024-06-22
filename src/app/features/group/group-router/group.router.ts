import {Component, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {NAVIGATION_ITEMS_GROUP} from '../group-navigation-signed-in';
import {SecondBarTopComponent} from '@polity-navigation/second-bar/second-bar-top/second-bar-top.component';
import {SecondBarRightComponent} from '@polity-navigation/second-bar/second-bar-right/second-bar-right.component';
import {NavigationItem} from '@polity-navigation/types-and-interfaces/navigationItem';
import {WikiHeadlineComponent} from '@polity-ui/polity-wiki/wiki-headline/wiki-headline.component';
import {FollowButton} from '@polity-ui/polity-wiki/follow-button/follow-button.component';
import {RequestButton} from '@polity-ui/polity-wiki/request-button/request-button.component';
import {CounterComponent} from '@polity-ui/polity-wiki/counter/counter.component';
import {GroupWikiPage} from '@polity-group/group-wiki-page/group-wiki.page';
import {GroupLoadHelperService} from '@polity-group/state/group-load-helper.service';

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
    protected grouLoadHelperService: GroupLoadHelperService = inject(GroupLoadHelperService);
    protected menuItemsGroup: WritableSignal<NavigationItem[]> = signal(NAVIGATION_ITEMS_GROUP);

    constructor(private route: ActivatedRoute) {
        this.menuItemsGroup = this.grouLoadHelperService.menuItemsGroup;
    }

    async ngOnInit(): Promise<void> {
        const urlId: string = this.route.snapshot.params['id'];
        await this.grouLoadHelperService.loadData(urlId);
    }

}
