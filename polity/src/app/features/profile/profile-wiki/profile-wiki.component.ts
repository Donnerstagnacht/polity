import {Component, signal, Signal, WritableSignal} from '@angular/core';
import {Profile} from "../types-and-interfaces/profile";
import {ProfileStoreService} from "../services/profile-store.service";
import {ProfileCountersStoreService} from "../../profile-follow/services/profile-counters-store.service";
import {PlainFunctions} from "../../../../../supabase/types/supabase.shorthand-types";
import {ProfileCountersService} from "../../profile-follow/services/profile-counters.service";

@Component({
    selector: 'polity-profile-wiki',
    templateUrl: './profile-wiki.component.html',
    styleUrls: ['./profile-wiki.component.less']
})
export class ProfileWikiComponent {
    protected isProfileLoading: WritableSignal<boolean> = signal(true);
    protected isProfileCounterLoading: WritableSignal<boolean> = signal(true);
    protected isFollowingCheckLoading: WritableSignal<boolean> = signal(true);
    protected profile: Signal<Profile | null>;
    protected profileCounter: WritableSignal<PlainFunctions<'select_following_counter'> | null> = signal(null);
    protected isOwner: WritableSignal<boolean>;
    protected isFollowing: WritableSignal<boolean>;

    constructor(
        private readonly profileStoreService: ProfileStoreService,
        private readonly profileCounterService: ProfileCountersService,
        private readonly profileCountersStoreService: ProfileCountersStoreService
    ) {
        this.isFollowingCheckLoading = this.profileStoreService.profile.uiFlagStore.getUiFlag('isFollowingCheckLoading')
        this.isProfileLoading = this.profileStoreService.profile.loading.getLoading()
        this.isProfileCounterLoading = this.profileCountersStoreService.profileCounters.loading.getLoading()
        this.profileCounter = this.profileCountersStoreService.profileCounters.getEntity()
        this.profile = this.profileStoreService.profile.getEntity()
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
