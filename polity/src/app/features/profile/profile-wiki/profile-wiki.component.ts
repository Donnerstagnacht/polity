import {Component, signal, Signal, WritableSignal} from '@angular/core';
import {Profile} from "../types-and-interfaces/profile";
import {ProfileStoreService} from "../services/profile-store.service";
import {ProfileStatisticsStoreService} from "../../profile-follow/services/profile-statistics-store.service";
import {ProfileStatistics} from "../types-and-interfaces/profile-statistics";
import {ProfileFollowService} from "../../profile-follow/services/profile-follow.service";

@Component({
    selector: 'polity-profile-wiki',
    templateUrl: './profile-wiki.component.html',
    styleUrls: ['./profile-wiki.component.less']
})
export class ProfileWikiComponent {
    protected isProfileLoading: WritableSignal<boolean> = signal(true);
    protected isProfileStatisticsLoading: WritableSignal<boolean> = signal(true);
    protected isFollowingCheckLoading: WritableSignal<boolean> = signal(true);
    protected profile: Signal<Profile | null>;
    protected keyFigure: WritableSignal<ProfileStatistics | null> = signal(null);
    protected isOwner: Signal<boolean>;

    constructor(
        private readonly profileStoreService: ProfileStoreService,
        private readonly profileStatisticsStoreService: ProfileStatisticsStoreService,
        private readonly profileFollowService: ProfileFollowService
    ) {
        this.isFollowingCheckLoading = this.profileFollowService.loadingCheckFollowing.getLoading()
        this.isProfileLoading = this.profileStoreService.profile.loading.getLoading()
        this.isProfileStatisticsLoading = this.profileStatisticsStoreService.profileStatistics.loading.getLoading()

        this.keyFigure = this.profileStatisticsStoreService.profileStatistics.getEntity()
        this.profile = this.profileStoreService.profile.getEntity()
        this.isOwner = this.profileStoreService.selectOwner()
    }

    async toggleFollow(newIsFollowing: boolean): Promise<void> {
        if (newIsFollowing) {
            await this.profileFollowService.followProfile();
        } else {
            await this.profileFollowService.unFollowProfile();
        }
    }
}
