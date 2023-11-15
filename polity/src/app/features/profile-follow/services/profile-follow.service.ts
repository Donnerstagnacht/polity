import {Injectable, WritableSignal} from '@angular/core';
import {createClient, PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {environment} from "../../../../environments/environment";
import {ProfileStatisticsStoreService} from "./profile-statistics-store.service";
import {ProfileStatistics} from "../../profile/types-and-interfaces/profile-statistics";
import {NotificationsStoreService} from "../../../core/services/notifications-store.service";
import {SessionStoreService} from "../../../core/services/session-store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileFollowService {
    private supabase: SupabaseClient

    constructor(
        private readonly profileStatisticsStoreService: ProfileStatisticsStoreService,
        private readonly notificationService: NotificationsStoreService,
        private readonly sessionStoreService: SessionStoreService
    ) {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    }

    /**
     * Retrieves the profile statistics for a given user.
     *
     * @param {string} userId - The ID of the user.
     * @return {Promise<any>} A promise that resolves with the profile statistics.
     */
    public async selectProfileStatistics(userId: string): Promise<any> {
        try {
            // @ts-ignore
            const response: PostgrestSingleResponse<ProfileStatistics> = await this.supabase.rpc(
                'select_following_counter',
                {user_id: userId}
            )
            .single()
            .throwOnError();
            console.log(response.data);
            this.profileStatisticsStoreService.setProfileStatistics(response.data);
            return response;
        } catch (error: any) {
            this.notificationService.updateNotification(error.message, true);
            return error;
        }
    }

    /**
     * Checks if the current user is following a profile.
     *
     * @return {Promise<any>} A promise that resolves to a boolean indicating whether the user is following the profile or not.
     */
    public async checkIfFollowing(): Promise<any> {
        const followerId: string = this.sessionStoreService.sessionId() as string;
        const profile: WritableSignal<ProfileStatistics> = this.profileStatisticsStoreService.selectProfileStatistics()
        const followingId: string | undefined = profile()?.profile_id;

        try {
            const response: PostgrestSingleResponse<boolean | unknown> = await this.supabase.rpc(
                'check_if_following',
                {
                    follower_id: followerId,
                    following_id: followingId
                }
            )
            .single()
            .throwOnError()

            if (response.data) {
                this.profileStatisticsStoreService.mutateIsFollowing(response.data as boolean)
                return true
            } else {
                this.profileStatisticsStoreService.mutateIsFollowing(response.data as boolean)
                return false
            }
        } catch (error: any) {
            this.notificationService.updateNotification(error.message, true);
            return error;
        }
    }

    /**
     * Toggles the follow status of a user.
     *
     * @param {boolean} isFollowing - Indicates whether the user is currently following or not.
     * @return {Promise<any>}
     */
    public async toggleFollow(isFollowing: boolean): Promise<any> {
        const followerId: string = this.sessionStoreService.sessionId() as string;
        const profile: WritableSignal<ProfileStatistics> = this.profileStatisticsStoreService.selectProfileStatistics()
        const followingId: string = profile()?.profile_id as string;

        try {
            let response;
            if (isFollowing && followingId) {
                response = await this.followProfile(followerId, followingId)
                this.profileStatisticsStoreService.mutateIsFollowing(true)
                this.profileStatisticsStoreService.incrementFollowerCounter()
            } else if (followingId) {
                response = await this.unFollowProfile(followerId, followingId)
                this.profileStatisticsStoreService.mutateIsFollowing(false)
                this.profileStatisticsStoreService.decrementFollowerCounter()
            }
            return response
        } catch (error: any) {
            this.notificationService.updateNotification(error.message, true);
            return error;
        }
    }

    /**
     * Removes a follower if removeFollower is set to true. Else it removes a following
     *
     * @param {string} userId - The ID of the user.
     * @param {boolean} removeFollower - Indicates whether to remove the follower. Else remove the follower
     * @returns {Promise<any>}
     */
    public async manageFollowers(userId: string, removeFollower: boolean): Promise<any> {
        const loggedInUserId = this.sessionStoreService.sessionId() as string;

        try {
            if (removeFollower) {
                const response: PostgrestSingleResponse<any> = await this.supabase.rpc(
                    'unfollow_transaction',
                    {
                        follower_id: userId,
                        following_id: loggedInUserId
                    }
                )
                .single()
                .throwOnError()
                this.profileStatisticsStoreService.decrementFollowerCounter()
            } else {
                const response: PostgrestSingleResponse<any> = await this.supabase.rpc(
                    'unfollow_transaction',
                    {
                        follower_id: loggedInUserId,
                        following_id: userId
                    }
                )
                .single()
                .throwOnError()
                this.profileStatisticsStoreService.decrementFollowingCounter()
            }
        } catch (error: any) {
            this.notificationService.updateNotification(error.message, true);
            return error;
        }
    }

    /**
     * Retrieves the followers and followings of the logged-in user.
     *
     * @return {Promise<any>} A promise that resolves to the follower and following data.
     */
    public async selectFollowersAndFollowings(): Promise<any> {
        const loggedInUserId: string = this.sessionStoreService.sessionId() as string;

        try {
            const followerResponse: PostgrestSingleResponse<any> = await this.supabase.rpc(
                'select_follower_of_user',
                {
                    following_id: loggedInUserId
                }
            )
            .throwOnError()

            const followingResponse: PostgrestSingleResponse<any> = await this.supabase.rpc(
                'select_following_of_user',
                {
                    follower_id: loggedInUserId
                }
            )
            .throwOnError()

            let followerAndFollowings: ProfileStatistics = {
                follower: followerResponse.data,
                following: followingResponse.data,
            };
            this.profileStatisticsStoreService.setProfileStatistics(followerAndFollowings)
        } catch (error: any) {
            this.notificationService.updateNotification(error.message, true);
            return error;
        }
    }

    private followProfile(followerId: string | undefined, followingId: string | undefined) {
        return this.supabase.rpc(
            'follow_transaction',
            {
                follower_id: followerId,
                following_id: followingId
            }
        ).throwOnError()
    }

    private unFollowProfile(followerId: string | undefined, followingId: string | undefined) {
        return this.supabase.rpc(
            'unfollow_transaction',
            {
                follower_id: followerId,
                following_id: followingId
            }
        ).throwOnError()
    }
}
