import {Component, signal, Signal, WritableSignal} from '@angular/core';
import {CounterComponent} from "../../../ui/polity-wiki/counter/counter.component";
import {FollowButton} from "../../../ui/polity-wiki/follow-button/follow-button.component";
import {RequestButton} from "../../../ui/polity-wiki/request-button/request-button.component";
import {WikiHeadlineComponent} from "../../../ui/polity-wiki/wiki-headline/wiki-headline.component";
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupStoreService} from "../action-store-service/group.store.service";

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

    protected isFollowingCheckLoading: WritableSignal<boolean> = signal(false);
    protected isFollowing: WritableSignal<boolean> = signal(false);

    constructor(
        private groupStoreService: GroupStoreService
    ) {

    }

    async ngOnInit(): Promise<void> {
        this.group = this.groupStoreService.group.getObject();
        this.isGroupLoading = this.groupStoreService.group.loading.getLoading();
    }

    async toggleFollow(newIsFollowing: boolean): Promise<void> {
        if (newIsFollowing) {
            console.log('follow')
            this.isFollowing.set(true);
            // await this.profileCounterService.followProfile();
        } else {
            console.log('unfollow')
            this.isFollowing.set(false);
            // await this.profileCounterService.unFollowProfile();
        }
    }

}
