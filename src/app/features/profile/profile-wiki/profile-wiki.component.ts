import {Component, inject, signal} from '@angular/core';
import {WikiHeadlineComponent} from '../../../ui/polity-wiki/wiki-headline/wiki-headline.component';
import {CounterComponent} from '../../../ui/polity-wiki/counter/counter.component';
import {FollowButton} from '../../../ui/polity-wiki/follow-button/follow-button.component';
import {WikiImageComponent} from '../../../ui/polity-wiki/wiki-image/wiki-image.component';
import {ProfileCounterStore} from '../../profile-follow/store/profile-counter.store';
import {ProfileFollowStore} from '../../profile-follow/store/profile-follow-store.service';
import {ProfileStore} from '../store/profile.store';

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
    protected profileFollowStore: ProfileFollowStore = inject(ProfileFollowStore);
    protected profileCounterStore: ProfileCounterStore = inject(ProfileCounterStore);
    protected profileStore: ProfileStore = inject(ProfileStore);

    // protected isProfileLoading: WritableSignal<boolean> = signal(true);
    // protected isProfileCounterLoading: WritableSignal<boolean> = signal(true);
    // protected isFollowingCheckLoading: WritableSignal<boolean> = signal(true);
    // protected profile: Signal<SupabaseObjectReturn<'read_profile'> | null>;
    // protected profileCounter: WritableSignal<SupabaseObjectReturn<'read_profile_counters'> | null> = signal(null);
    // protected isOwner: WritableSignal<boolean>;
    // protected isFollowing: WritableSignal<boolean>;
    protected readonly signal = signal;

    constructor(
        // private readonly profileStoreService: ProfileStoreService
        // private readonly profileCountersStoreService: ProfileCountersStoreService,
        // private readonly followersOfUserActionService: FollowersOfUserActionService
    ) {
        // this.isFollowingCheckLoading = this.profileStoreService.profile.uiFlagStore.getFlag('isFollowingCheckLoading');
        // this.isProfileLoading = this.profileStoreService.profile.loading.getLoading();
        // this.isProfileCounterLoading = this.profileCountersStoreService.profileCounters.loading.getLoading()
        // this.profileCounter = this.profileCountersStoreService.profileCounters.getObject()
        // this.profile = this.profileStoreService.profile.getObject();
        // this.isOwner = this.profileStoreService.profile.uiFlagStore.getFlag('isOwner');
        // this.isFollowing = this.profileStoreService.profile.uiFlagStore.getFlag('isFollowing');
    }

    async toggleFollow(newIsFollowing: boolean): Promise<void> {
        if (newIsFollowing) {
            await this.profileFollowStore.follow();
            // await this.followersOfUserActionService.followProfile();
        } else {
            this.profileFollowStore.unfollow();
            // await this.followersOfUserActionService.unFollowProfile();
        }
    }
}
