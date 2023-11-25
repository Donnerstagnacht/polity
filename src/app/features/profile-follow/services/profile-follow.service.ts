import {Injectable} from '@angular/core';
import {SupabaseClient} from "@supabase/supabase-js";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../shared/services/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class ProfileFollowService {
    // public loadingCheckFollowing: LoadingStoreService
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly sessionStoreService: SessionStoreService
    ) {
        // this.loadingCheckFollowing = new LoadingStoreService();

    }

    /**
     * Retrieves the profile statistics for a given user.
     *
     * @param {string} userId - The ID of the user.
     * @return {Promise<any>} A promise that resolves with the profile statistics.
     */
    // public async selectProfileStatistics(userId: string): Promise<void> {
    //     await this.profileStatisticsStoreService.profileStatistics.wrapSelectFunction(async (): Promise<void> => {
    //         const response: PostgrestSingleResponse<Tables<'profiles_counters'>> = await this.supabaseClient.rpc(
    //             'select_following_counter',
    //             {user_id: userId}
    //         )
    //         .single()
    //         .throwOnError();
    //
    //         if (response.data) {
    //             const updateData: ProfileStatistics = {
    //                 counters: response.data,
    //             } as ProfileStatistics;
    //             this.profileStatisticsStoreService.profileStatistics.mutateEntity(updateData);
    //         }
    //     })
    // }

    /**
     * Checks if the current user is following a profile.
     *
     * @return {Promise<any>} A promise that resolves to a boolean indicating whether the user is following the profile or not.
     */
    // public async checkIfFollowing(): Promise<void> {
    //     const followerId: string = this.sessionStoreService.getSessionId() as string;
    //     const followingId: string = this.profileStatisticsStoreService.profileStatistics.getValueByKey('counters.profile_id')
    //
    //     await this.profileStatisticsStoreService.profileStatistics.wrapSelectFunction(async (): Promise<void> => {
    //         this.loadingCheckFollowing.startLoading()
    //         const response: PostgrestSingleResponse<boolean | PostgrestError> = await this.supabaseClient.rpc(
    //             'check_if_following',
    //             {
    //                 follower_id: followerId,
    //                 following_id: followingId as string
    //             }
    //         )
    //         .single()
    //         .throwOnError();
    //
    //         const update: ProfileStatistics = {
    //             is_following: response.data as boolean,
    //         } as ProfileStatistics
    //         this.profileStatisticsStoreService.profileStatistics.mutateEntity(update);
    //         this.loadingCheckFollowing.stopLoading();
    //     })
    // }

    /**
     * Removes a follower if removeFollower is set to true. Else it removes a following
     *
     * @param {string} userId - The ID of the user.
     * @param {boolean} removeFollower - Indicates whether to remove the follower. Else remove the follower
     * @returns {Promise<any>}
     */
    // public async manageFollowers(userId: string, removeFollower: boolean): Promise<any> {
    //     const loggedInUserId: string = this.sessionStoreService.getSessionId() as string;
    //
    //     this.profileStatisticsStoreService.profileStatistics.wrapUpdateFunction(async (): Promise<void> => {
    //         if (removeFollower) {
    //             const response: PostgrestSingleResponse<void | PostgrestError> = await this.supabaseClient.rpc(
    //                 'unfollow_transaction',
    //                 {
    //                     follower_id: userId,
    //                     following_id: loggedInUserId
    //                 }
    //             )
    //             .single()
    //             .throwOnError()
    //             this.profileStatisticsStoreService.profileStatistics.decrementKey('follower_counter')
    //         } else {
    //             const response: PostgrestSingleResponse<void | PostgrestError> = await this.supabaseClient.rpc(
    //                 'unfollow_transaction',
    //                 {
    //                     follower_id: loggedInUserId,
    //                     following_id: userId
    //                 }
    //             )
    //             .single()
    //             .throwOnError()
    //
    //             this.profileStatisticsStoreService.profileStatistics.decrementKey('following_counter')
    //         }
    //     })
    // }

    /**
     * Retrieves the followers and followings of the logged-in user.
     *
     * @return {Promise<any>} A promise that resolves to the follower and following data.
     */
    // public async selectFollowersAndFollowings(): Promise<any> {
    //     const loggedInUserId: string = this.sessionStoreService.getSessionId() as string;
    //     await this.profileStatisticsStoreService.profileStatistics.wrapSelectFunction(async (): Promise<void> => {
    //         const followerResponse: PostgrestSingleResponse<Functions<'select_follower_of_user'>> = await this.supabaseClient.rpc(
    //             'select_follower_of_user',
    //             {
    //                 following_id: loggedInUserId
    //             }
    //         )
    //         .throwOnError()
    //
    //         const followingResponse: PostgrestSingleResponse<Functions<'select_following_of_user'>> = await this.supabaseClient.rpc(
    //             'select_following_of_user',
    //             {
    //                 follower_id: loggedInUserId
    //             }
    //         )
    //         .throwOnError()
    //
    //         let followerAndFollowings: ProfileStatistics = {
    //             follower: followerResponse.data,
    //             following: followingResponse.data,
    //         };
    //         this.profileStatisticsStoreService.profileStatistics.mutateEntity(followerAndFollowings)
    //     })
    //
    // }

    // public async followProfile() {
    //     const followerId: string = this.sessionStoreService.getSessionId() as string;
    //     const followingId: string = this.profileStatisticsStoreService.profileStatistics.getValueByKey('counters.profile_id');
    //     await this.profileStatisticsStoreService.profileStatistics.wrapUpdateFunction(async (): Promise<void> => {
    //         const response: PostgrestSingleResponse<Functions<'follow_transaction'>> = await this.supabaseClient.rpc(
    //             'follow_transaction',
    //             {
    //                 follower_id: followerId,
    //                 following_id: followingId
    //             }
    //         ).throwOnError()
    //
    //         const update: ProfileStatistics = {
    //             is_following: true,
    //         } as ProfileStatistics
    //         this.profileStatisticsStoreService.profileStatistics.mutateEntity(update)
    //         this.profileStatisticsStoreService.profileStatistics.incrementKey('follower_counter')
    //     })
    // }
    //
    // public async unFollowProfile() {
    //     const followerId: string = this.sessionStoreService.getSessionId() as string;
    //     const followingId = this.profileStatisticsStoreService.profileStatistics.getValueByKey('counters.profile_id');
    //     await this.profileStatisticsStoreService.profileStatistics.wrapUpdateFunction(async (): Promise<void> => {
    //         const response: PostgrestSingleResponse<Functions<'unfollow_transaction'>> = await this.supabaseClient.rpc(
    //             'unfollow_transaction',
    //             {
    //                 follower_id: followerId,
    //                 following_id: followingId
    //             }
    //         ).throwOnError()
    //
    //         const update: ProfileStatistics = {
    //             is_following: false,
    //         } as ProfileStatistics
    //         this.profileStatisticsStoreService.profileStatistics.mutateEntity(update)
    //         this.profileStatisticsStoreService.profileStatistics.decrementKey('follower_counter')
    //     })
    // }
}