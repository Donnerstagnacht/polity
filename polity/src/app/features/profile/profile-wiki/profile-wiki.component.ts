import {Component, signal, Signal, WritableSignal} from '@angular/core';
import {Profile} from "../types-and-interfaces/profile";
import {ProfileStoreService} from "../services/profile-store.service";
import {UiStoreService} from "../../../core/services/ui-store.service";
import {ProfileStatisticsStoreService} from "../../profile-follow/services/profile-statistics-store.service";
import {ProfileStatistics} from "../types-and-interfaces/profile-statistics";
import {ProfileFollowService} from "../../profile-follow/services/profile-follow.service";

@Component({
    selector: 'polity-profile-wiki',
    templateUrl: './profile-wiki.component.html',
    styleUrls: ['./profile-wiki.component.less']
})
export class ProfileWikiComponent {
    protected isLoading: WritableSignal<boolean> = signal(true);
    protected profile: Signal<Profile | null>;
    protected keyFigure: WritableSignal<ProfileStatistics | null>;
    protected isOwner: Signal<boolean>;

    constructor(
        private readonly profileStoreService: ProfileStoreService,
        private readonly globalUiStateService: UiStoreService,
        private readonly profileStatisticsStoreService: ProfileStatisticsStoreService,
        private readonly profileFollowService: ProfileFollowService
    ) {
        this.isLoading = this.globalUiStateService.selectLoading();
        this.isOwner = this.globalUiStateService.selectIsOwner();
        this.profile = this.profileStoreService.selectProfile()
        this.keyFigure = this.profileStatisticsStoreService.selectProfileStatistics()
    }

    async toggleFollow(newIsFollowing: boolean): Promise<void> {
        if (newIsFollowing) {
            await this.profileFollowService.followProfile();
        } else {
            await this.profileFollowService.unFollowProfile();
        }
    }
}
