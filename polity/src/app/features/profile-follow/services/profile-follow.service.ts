import {Injectable, WritableSignal} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {ProfileStatisticsStoreService} from "./profile-statistics-store.service";
import {ProfileStatistics} from "../../profile/types-and-interfaces/profile-statistics";
import {NotificationsStoreService} from "../../../core/services/notifications-store.service";
import {SessionStoreService} from "../../../core/services/session-store.service";
import supabaseClient from "../../../core/services/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class ProfileFollowService {
    private readonly supabaseClient: SupabaseClient = supabaseClient();

    constructor(
        private readonly profileStatisticsStoreService: ProfileStatisticsStoreService,
        private readonly notificationService: NotificationsStoreService,
        private readonly sessionStoreService: SessionStoreService
    ) {
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
            const response: PostgrestSingleResponse<ProfileStatistics> = await this.supabaseClient.rpc(
                'select_following_counter',
                {user_id: userId}
            )
            .single()
            .throwOnError();
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
        const profile: WritableSignal<ProfileStatistics | null> = this.profileStatisticsStoreService.selectProfileStatistics()
        const followingId: string | undefined = profile()?.profile_id;

        try {
            const response: PostgrestSingleResponse<boolean | unknown> = await this.supabaseClient.rpc(
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
                const response: PostgrestSingleResponse<any> = await this.supabaseClient.rpc(
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
                const response: PostgrestSingleResponse<any> = await this.supabaseClient.rpc(
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
            const followerResponse: PostgrestSingleResponse<any> = await this.supabaseClient.rpc(
                'select_follower_of_user',
                {
                    following_id: loggedInUserId
                }
            )
            .throwOnError()

            const followingResponse: PostgrestSingleResponse<any> = await this.supabaseClient.rpc(
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

    public async followProfile() {
        const followerId: string = this.sessionStoreService.sessionId() as string;
        const profile: WritableSignal<ProfileStatistics | null> = this.profileStatisticsStoreService.selectProfileStatistics()
        const followingId: string = profile()?.profile_id as string;
        try {
            const response: PostgrestSingleResponse<any> = await this.supabaseClient.rpc(
                'follow_transaction',
                {
                    follower_id: followerId,
                    following_id: followingId
                }
            ).throwOnError()
            this.profileStatisticsStoreService.mutateIsFollowing(true)
            this.profileStatisticsStoreService.incrementFollowerCounter()
            return response
        } catch (error: any) {
            this.notificationService.updateNotification(error.message, true);
            return error;
        }
    }

    public async unFollowProfile() {
        const followerId: string = this.sessionStoreService.sessionId() as string;
        const profile: WritableSignal<ProfileStatistics | null> = this.profileStatisticsStoreService.selectProfileStatistics()
        const followingId: string = profile()?.profile_id as string;

        try {
            const response: PostgrestSingleResponse<any> = await this.supabaseClient.rpc(
                'unfollow_transaction',
                {
                    follower_id: followerId,
                    following_id: followingId
                }
            ).throwOnError()
            this.profileStatisticsStoreService.mutateIsFollowing(false)
            this.profileStatisticsStoreService.decrementFollowerCounter()
            return response
        } catch (error: any) {
            this.notificationService.updateNotification(error.message, true);
            return error;
        }
    }
}
