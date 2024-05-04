import {Component, signal, Signal, WritableSignal} from '@angular/core';
import {CounterComponent} from "../../../ui/polity-wiki/counter/counter.component";
import {FollowButton} from "../../../ui/polity-wiki/follow-button/follow-button.component";
import {RequestButton} from "../../../ui/polity-wiki/request-button/request-button.component";
import {WikiHeadlineComponent} from "../../../ui/polity-wiki/wiki-headline/wiki-headline.component";
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupStoreService} from "../action-store-service/group.store.service";
import {GroupCountersActionService} from "../../group-follow/action-store-services/group-counters.action.service";
import {GroupCountersStoreService} from "../../group-follow/action-store-services/group-counters.store.service";

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
    protected group: Signal<FunctionSingleReturn<'read_group_columns'> | null> = signal(null);
    protected isGroupLoading: WritableSignal<boolean> = signal(true);
    protected isGroupMemberLoading: WritableSignal<boolean> = signal(false);

    protected groupCounter: WritableSignal<FunctionSingleReturn<'read_group_following_counter'> | null> = signal(null);
    protected isGroupCounterLoading: WritableSignal<boolean> = signal(true);

    protected isFollowingCheckLoading: WritableSignal<boolean> = signal(false);
    protected isFollowing: WritableSignal<boolean> = signal(false);

    constructor(
        private groupStoreService: GroupStoreService,
        private groupCountersStoreService: GroupCountersStoreService,
        private groupCountersActionService: GroupCountersActionService
    ) {

    }

    async ngOnInit(): Promise<void> {
        this.group = this.groupStoreService.group.getObject();
        this.groupCounter = this.groupCountersStoreService.groupCounters.getObject();

        this.isGroupLoading = this.groupStoreService.group.loading.getLoading();
        this.isGroupCounterLoading = this.groupCountersStoreService.groupCounters.loading.getLoading();
        this.isFollowingCheckLoading = this.groupStoreService.group.uiFlagStore.getUiFlag('isFollowingCheckLoading');
        this.isFollowing = this.groupStoreService.group.uiFlagStore.getUiFlag('isFollowing');
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

}
