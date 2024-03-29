import {Component, signal, Signal, WritableSignal} from '@angular/core';
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {WikiHeadlineComponent} from "../../../ui/polity-wiki/wiki-headline/wiki-headline.component";
import {CounterComponent} from "../../../ui/polity-wiki/counter/counter.component";
import {FollowButton} from "../../../ui/polity-wiki/follow-button/follow-button.component";
import {WikiImageComponent} from "../../../ui/polity-wiki/wiki-image/wiki-image.component";
import {ProfileStoreService} from "../action-store-services/profile.store.service";
import {ProfileCountersActionService} from "../../profile-follow/action-store-services/profile-counters.action.service";
import {ProfileCountersStoreService} from "../../profile-follow/action-store-services/profile-counters.store.service";

@Component({
    selector: 'polity-profile-wiki',
    templateUrl: './profile-wiki.component.html',
    styleUrls: ['./profile-wiki.component.less'],
    standalone: true,
    imports: [
        WikiHeadlineComponent,
        CounterComponent,
        FollowButton,
        WikiImageComponent
    ]
})
export class ProfileWikiComponent {
    protected isProfileLoading: WritableSignal<boolean> = signal(true);
    protected isProfileCounterLoading: WritableSignal<boolean> = signal(true);
    protected isFollowingCheckLoading: WritableSignal<boolean> = signal(true);
    protected profile: Signal<FunctionSingleReturn<'select_user'> | null>;
    protected profileCounter: WritableSignal<FunctionSingleReturn<'select_following_counter'> | null> = signal(null);
    protected isOwner: WritableSignal<boolean>;
    protected isFollowing: WritableSignal<boolean>;

    constructor(
        private readonly profileStoreService: ProfileStoreService,
        private readonly profileCounterService: ProfileCountersActionService,
        private readonly profileCountersStoreService: ProfileCountersStoreService
    ) {
        this.isFollowingCheckLoading = this.profileStoreService.profile.uiFlagStore.getUiFlag('isFollowingCheckLoading')
        this.isProfileLoading = this.profileStoreService.profile.loading.getLoading()
        this.isProfileCounterLoading = this.profileCountersStoreService.profileCounters.loading.getLoading()
        this.profileCounter = this.profileCountersStoreService.profileCounters.getObject()
        this.profile = this.profileStoreService.profile.getObject()
        this.isOwner = this.profileStoreService.profile.uiFlagStore.getUiFlag('isOwner')
        this.isFollowing = this.profileStoreService.profile.uiFlagStore.getUiFlag('isFollowing')
    }

    async toggleFollow(newIsFollowing: boolean): Promise<void> {
        if (newIsFollowing) {
            await this.profileCounterService.followProfile();
        } else {
            await this.profileCounterService.unFollowProfile();
        }
    }
}
