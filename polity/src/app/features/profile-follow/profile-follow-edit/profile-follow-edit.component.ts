import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {ProfileStatistics} from "../../profile/types-and-interfaces/profile-statistics";
import {ProfileFollowService} from "../services/profile-follow.service";
import {UiStoreService} from "../../../core/services/ui-store.service";
import {ProfileStatisticsStoreService} from "../services/profile-statistics-store.service";

@Component({
    selector: 'polity-profile-follow-edit',
    templateUrl: './profile-follow-edit.component.html',
    styleUrls: ['./profile-follow-edit.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProfileFollowEditComponent {
    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];
    protected activeItemIndex: number = 0;
    protected profileStatistics: WritableSignal<ProfileStatistics> = signal({
        follower_counter: 0,
        following_counter: 0,
        follower: [
            {
                id: '',
                last_name: '',
                profile_image: ',',
                first_name: ''
            }
        ],
        following: [
            {
                id: '',
                last_name: '',
                profile_image: ',',
                first_name: ''
            }
        ],
        is_following: false,
        profile_id: ''
    });
    protected showFollowers: boolean = true;

    constructor(
        private readonly profileFollowService: ProfileFollowService,
        private readonly uiStoreService: UiStoreService,
        private readonly profileStatisticsStoreService: ProfileStatisticsStoreService
    ) {
        this.uiStoreService.setLoading(true);

        this.profileStatistics = this.profileStatisticsStoreService.selectProfileStatistics() as WritableSignal<ProfileStatistics>
        this.profileFollowService.selectFollowersAndFollowings();

        this.uiStoreService.setLoading(false);
    }

    protected showFollowerList(): void {
        this.showFollowers = true;
    }

    protected showFollowingList(): void {
        this.showFollowers = false;
    }

    protected removeFollower(id: string): void {
        this.profileFollowService.manageFollowers(id, true)
        const follower: ProfileStatistics = {
            follower: this.profileStatistics()?.follower?.filter(follower => follower.id !== id)
        };
        this.profileStatisticsStoreService.setProfileStatistics(follower)
    }

    protected removeFollowing(id: string): void {
        this.profileFollowService.manageFollowers(id, false)
        const following: ProfileStatistics = {
            following: this.profileStatistics()?.following?.filter(following => following.id !== id)
        };
        this.profileStatisticsStoreService.setProfileStatistics(following)
    }
}
