import {Component, signal, Signal, WritableSignal} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {WikiHeadlineComponent} from "../../../ui/polity-wiki/wiki-headline/wiki-headline.component";
import {CounterComponent} from "../../../ui/polity-wiki/counter/counter.component";
import {FollowButton} from "../../../ui/polity-wiki/follow-button/follow-button.component";
import {WikiImageComponent} from "../../../ui/polity-wiki/wiki-image/wiki-image.component";
import {ProfileStoreService} from "../action-store-services/profile.store.service";
import {ProfileCountersStoreService} from "../../profile-follow/action-store-services/profile-counters.store.service";
import {
    FollowersOfUserActionService
} from "../../profile-follow/action-store-services/followers-of-user.action.service";

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
    protected profile: Signal<SupabaseObjectReturn<'read_profile'> | null>;
    protected profileCounter: WritableSignal<SupabaseObjectReturn<'read_profile_counters'> | null> = signal(null);
    protected isOwner: WritableSignal<boolean>;
    protected isFollowing: WritableSignal<boolean>;

    constructor(
        private readonly profileStoreService: ProfileStoreService,
        private readonly profileCountersStoreService: ProfileCountersStoreService,
        private readonly followersOfUserActionService: FollowersOfUserActionService
    ) {
        this.isFollowingCheckLoading = this.profileStoreService.profile.uiFlagStore.getFlag('isFollowingCheckLoading')
        this.isProfileLoading = this.profileStoreService.profile.loading.getLoading()
        this.isProfileCounterLoading = this.profileCountersStoreService.profileCounters.loading.getLoading()
        this.profileCounter = this.profileCountersStoreService.profileCounters.getObject()
        this.profile = this.profileStoreService.profile.getObject()
        this.isOwner = this.profileStoreService.profile.uiFlagStore.getFlag('isOwner')
        this.isFollowing = this.profileStoreService.profile.uiFlagStore.getFlag('isFollowing')
    }

    async toggleFollow(newIsFollowing: boolean): Promise<void> {
        if (newIsFollowing) {
            await this.followersOfUserActionService.followProfile();
        } else {
            await this.followersOfUserActionService.unFollowProfile();
        }
    }
}
