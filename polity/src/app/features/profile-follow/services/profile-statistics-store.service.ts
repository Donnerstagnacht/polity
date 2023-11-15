import {Injectable, signal, WritableSignal} from '@angular/core';
import {ProfileStatistics} from "../../profile/types-and-interfaces/profile-statistics";

@Injectable({
    providedIn: 'root'
})
export class ProfileStatisticsStoreService {
    private profileStatistics: WritableSignal<ProfileStatistics | null> = signal({
        follower_counter: 0,
        following_counter: 0,
        follower: [],
        following: [],
        is_following: false,
        profile_id: ''
    });

    /**
     * Returns the global profile statistics object that notifies consumers of changes
     *
     * @return WritableSignal<ProfileStatistics>.
     */
    public selectProfileStatistics(): WritableSignal<ProfileStatistics | null> {
        return this.profileStatistics;
    }

    /**
     * Sets the profile statistics with the provided statistics.
     *
     * @param {ProfileStatistics | null} profileStatistics - The profile statistics to update. If null, the profile
     * statistics will be cleared.
     * @return {void}
     */
    public setProfileStatistics(profileStatistics: ProfileStatistics | null): void {
        // TODO: Understanding why this works
        const mergeUpdatesWithStoreData: ProfileStatistics = {
            ...this.profileStatistics(),
            ...profileStatistics
        } as ProfileStatistics
        this.profileStatistics.set(mergeUpdatesWithStoreData);
    }

    /**
     * Resets the profile statistics state.
     *
     * @return {void}
     */
    public resetProfileStatistics(): void {
        this.profileStatistics.set(null);
    }

    /**
     * Mutates the 'isFollowing' status of a profile.
     *
     * @param {boolean | null} isFollowing - If true, the status implies that the authenticated user already follows
     * the displayed user.
     * @return {void}
     */
    public mutateIsFollowing(isFollowing: boolean | null): void {
        this.profileStatistics.mutate(
            (profileStatistics: ProfileStatistics | null): void => {
                if (profileStatistics) {
                    profileStatistics.is_following = isFollowing as boolean;
                }
            }
        )
    }

    /**
     * Increments the follower counter by 1.
     */
    public incrementFollowerCounter(): void {
        this.profileStatistics.mutate(
            (profileStatistics: ProfileStatistics | null): void => {
                if (profileStatistics?.following_counter) {
                    profileStatistics.follower_counter!++;
                }
            }
        )
    }

    /**
     * Decrements the follower counter by 1.
     */
    public decrementFollowerCounter(): void {
        this.profileStatistics.mutate(
            (profileStatistics: ProfileStatistics | null): void => {
                if (profileStatistics?.following_counter) {
                    profileStatistics.follower_counter!--;
                }
            }
        )
    }

    /**
     * Increments the following counter by 1.
     */
    public decrementFollowingCounter(): void {
        this.profileStatistics.mutate(
            (profileStatistics: ProfileStatistics | null): void => {
                if (profileStatistics?.following_counter) {
                    profileStatistics.following_counter--;
                }
            }
        )
    }
}
