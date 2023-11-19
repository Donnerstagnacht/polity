import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {ProfileStatistics} from "../../profile/types-and-interfaces/profile-statistics";
import {ProfileFollowService} from "../services/profile-follow.service";
import {UiStoreService} from "../../../core/services/ui-store.service";
import {ProfileStatisticsStoreService} from "../services/profile-statistics-store.service";
import {ProfileMin} from "../../profile/types-and-interfaces/profile";

@Component({
    selector: 'polity-profile-follow-edit',
    templateUrl: './profile-follow-edit.component.html',
    styleUrls: ['./profile-follow-edit.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProfileFollowEditComponent {
    protected readonly loading: WritableSignal<boolean> = signal(false);
    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];
    protected activeItemIndex: number = 0;
    protected profileStatistics: WritableSignal<ProfileStatistics | null> = signal({
        counters: {
            follower_counter: 0,
            unread_notifications_counter: 0,
            following_counter: 0,
            profile_id: ''
        },
        // follower_counter: 0,
        // following_counter: 0,
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
    });

    protected showFollowers: boolean = true;

    constructor(
        private readonly profileFollowService: ProfileFollowService,
        private readonly uiStoreService: UiStoreService,
        private readonly profileStatisticsStoreService: ProfileStatisticsStoreService
    ) {
        this.uiStoreService.setLoading(true);
        this.loading = this.profileStatisticsStoreService.profileStatistics.loading.selectLoading()
        this.profileStatistics = this.profileStatisticsStoreService.profileStatistics.selectEntity()
        // this.profileStatistics = this.profileStatisticsStoreService.selectProfileStatistics() as WritableSignal<ProfileStatistics>
        this.profileStatisticsStoreService.profileStatistics.loading.startLoading()
        this.profileFollowService.selectFollowersAndFollowings();
        this.profileStatisticsStoreService.profileStatistics.loading.stopLoading()

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
        }
        this.profileStatisticsStoreService.profileStatistics.mutateEntity(follower)
        // this.profileStatisticsStoreService.setProfileStatistics(follower)
    }

    protected removeFollowing(id: string): void {
        this.profileFollowService.manageFollowers(id, false)
        const following: ProfileStatistics = {
            following: this.profileStatistics()?.following?.filter(following => following.id !== id) as ProfileMin[]
        } as ProfileStatistics;
        this.profileStatisticsStoreService.profileStatistics.mutateEntity(following)
        // this.profileStatisticsStoreService.setProfileStatistics(following)
    }
}
