import {Injectable, WritableSignal} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {ProfileStatisticsStoreService} from "./profile-statistics-store.service";
import {ProfileStatistics} from "../../profile/types-and-interfaces/profile-statistics";
import {ErrorStoreService} from "../../../core/services/error-store.service";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {supabaseClient} from "../../../core/services/supabase-client";
import {DatabaseModified} from "../../../../../supabase/types/supabase.modified";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class ProfileFollowService {
    private readonly supabaseClient: SupabaseClient<DatabaseModified> = supabaseClient;

    constructor(
        private readonly profileStatisticsStoreService: ProfileStatisticsStoreService,
        private readonly notificationService: ErrorStoreService,
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
            const response: PostgrestSingleResponse<Tables<'profiles_counters'>> = await this.supabaseClient.rpc(
                'select_following_counter',
                {user_id: userId}
            )
            .single()
            .throwOnError();

            if (response.data) {
                const updateData: ProfileStatistics = {
                    counters: response.data,
                } as ProfileStatistics;
                console.log(response.data)
                this.profileStatisticsStoreService.profileStatistics.mutateEntity(updateData);
                // this.profileStatisticsStoreService.setProfileStatistics(updateData);
            }
            return response;
        } catch (error: any) {
            this.notificationService.updateError(error.message, true);
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
        const profile: WritableSignal<ProfileStatistics | null> = this.profileStatisticsStoreService.profileStatistics.selectEntity()
        // const profile: WritableSignal<ProfileStatistics | null> = this.profileStatisticsStoreService.selectProfileStatistics()
        const followingId: string | undefined = profile()?.counters?.profile_id as string;

        try {
            const response: PostgrestSingleResponse<boolean | unknown> = await this.supabaseClient.rpc(
                'check_if_following',
                {
                    follower_id: followerId,
                    following_id: followingId as string
                }
            )
            .single()
            .throwOnError();

            const update: ProfileStatistics = {
                is_following: response.data as boolean,
            } as ProfileStatistics
            if (response.data) {
                this.profileStatisticsStoreService.profileStatistics.mutateEntity(update)

                // this.profileStatisticsStoreService.mutateIsFollowing(response.data as boolean)

                // this.profileStatisticsStoreService.mutateIsFollowing(response.data as boolean)
                return true
            } else {
                this.profileStatisticsStoreService.profileStatistics.mutateEntity(update)

                // this.profileStatisticsStoreService.mutateIsFollowing(response.data as boolean)
                return false
            }
        } catch (error: any) {
            this.notificationService.updateError(error.message, true);
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
                //TODO:
                this.profileStatisticsStoreService.profileStatistics.decrementKey('follower_counter')
                // this.profileStatisticsStoreService.decrementFollowerCounter()
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
                // TODO
                this.profileStatisticsStoreService.profileStatistics.decrementKey('following_counter')
                // this.profileStatisticsStoreService.decrementFollowingCounter()
            }
        } catch (error: any) {
            this.notificationService.updateError(error.message, true);
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
            this.profileStatisticsStoreService.profileStatistics.mutateEntity(followerAndFollowings)
            // this.profileStatisticsStoreService.setProfileStatistics(followerAndFollowings)
        } catch (error: any) {
            this.notificationService.updateError(error.message, true);
            return error;
        }
    }

    public async followProfile() {
        const followerId: string = this.sessionStoreService.sessionId() as string;
        const profile: WritableSignal<ProfileStatistics | null> = this.profileStatisticsStoreService.profileStatistics.selectEntity()

        // const profile: WritableSignal<ProfileStatistics | null> = this.profileStatisticsStoreService.selectProfileStatistics()
        const followingId: string = profile()?.counters?.profile_id as string;
        try {
            const response: PostgrestSingleResponse<any> = await this.supabaseClient.rpc(
                'follow_transaction',
                {
                    follower_id: followerId,
                    following_id: followingId
                }
            ).throwOnError()
            const update: ProfileStatistics = {
                is_following: true,
            } as ProfileStatistics
            this.profileStatisticsStoreService.profileStatistics.mutateEntity(update)
            // this.profileStatisticsStoreService.mutateIsFollowing(true)
            //TODO
            console.log('update', update)
            console.log('before increment')
            this.profileStatisticsStoreService.profileStatistics.incrementKey('follower_counter')
            // this.profileStatisticsStoreService.profileStatistics.incrementNumberProperty('counter.follower')
            // this.profileStatisticsStoreService.incrementFollowerCounter()
            return response
        } catch (error: any) {
            this.notificationService.updateError(error.message, true);
            return error;
        }
    }

    public async unFollowProfile() {
        const followerId: string = this.sessionStoreService.sessionId() as string;
        const profile: WritableSignal<ProfileStatistics | null> = this.profileStatisticsStoreService.profileStatistics.selectEntity()

        // const profile: WritableSignal<ProfileStatistics | null> = this.profileStatisticsStoreService.selectProfileStatistics()
        const followingId: string = profile()?.counters?.profile_id as string;

        try {
            const response: PostgrestSingleResponse<any> = await this.supabaseClient.rpc(
                'unfollow_transaction',
                {
                    follower_id: followerId,
                    following_id: followingId
                }
            ).throwOnError()

            const update: ProfileStatistics = {
                is_following: false,
            } as ProfileStatistics
            console.log('update', update)
            // TODO: uncomment this line
            this.profileStatisticsStoreService.profileStatistics.mutateEntity(update)

            // this.profileStatisticsStoreService.mutateIsFollowing(false)
            console.log('before decrement')

            this.profileStatisticsStoreService.profileStatistics.decrementKey('follower_counter')
            // this.profileStatisticsStoreService.decrementFollowerCounter()
            return response
        } catch (error: any) {
            this.notificationService.updateError(error.message, true);
            return error;
        }
    }
}
