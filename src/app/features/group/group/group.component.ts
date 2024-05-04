import {Component} from '@angular/core';
import {GroupActionService} from "../action-store-service/group.action.service";
import {ActivatedRoute} from "@angular/router";
import {WikiHeadlineComponent} from "../../../ui/polity-wiki/wiki-headline/wiki-headline.component";
import {FollowButton} from "../../../ui/polity-wiki/follow-button/follow-button.component";
import {RequestButton} from "../../../ui/polity-wiki/request-button/request-button.component";
import {CounterComponent} from "../../../ui/polity-wiki/counter/counter.component";
import {GroupWikiComponent} from "../group-wiki/group-wiki.component";
import {GroupCountersActionService} from "../../group-follow/action-store-services/group-counters.action.service";
import {GroupStoreService} from "../action-store-service/group.store.service";
import {GroupCountersStoreService} from "../../group-follow/action-store-services/group-counters.store.service";

@Component({
    selector: 'polity-group',
    standalone: true,
    imports: [
        WikiHeadlineComponent,
        FollowButton,
        RequestButton,
        CounterComponent,
        GroupWikiComponent
    ],
    templateUrl: './group.component.html',
    styleUrl: './group.component.less'
})
export class GroupComponent {

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

        await Promise.all([
            this.groupActionService.readGroup(urlId),
            this.groupCountersActionService.selectGroupCounter(urlId)
        ])
        console.log(urlId)
    }

    ngOnDestroy(): void {
        this.groupStoreService.group.resetObject();
        this.groupCountersStoreService.groupCounters.resetObject()
    }


}
