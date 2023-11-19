import {Injectable} from '@angular/core';
import {PostgrestError, PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {ProfileStatisticsStoreService} from "./profile-statistics-store.service";
import {ProfileStatistics} from "../../profile/types-and-interfaces/profile-statistics";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {DatabaseModified} from "../../../../../supabase/types/supabase.modified";
import {Functions, Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {supabaseClient} from "../../../shared/services/supabase-client";
import {WrapperCodeService} from "../../../shared/services/wrapper-code.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileFollowService {
    private readonly supabaseClient: SupabaseClient<DatabaseModified> = supabaseClient;

    constructor(
        private readonly profileStatisticsStoreService: ProfileStatisticsStoreService,
        private readonly sessionStoreService: SessionStoreService,
        private readonly wrapperCodeService: WrapperCodeService
    ) {
    }

    /**
     * Retrieves the profile statistics for a given user.
     *
     * @param {string} userId - The ID of the user.
     * @return {Promise<any>} A promise that resolves with the profile statistics.
     */
    public async selectProfileStatistics(userId: string): Promise<void> {
        await this.wrapperCodeService.wrapFunction(async (): Promise<void> => {
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
                this.profileStatisticsStoreService.profileStatistics.mutateEntity(updateData);
            }
        })
    }

    /**
     * Checks if the current user is following a profile.
     *
     * @return {Promise<any>} A promise that resolves to a boolean indicating whether the user is following the profile or not.
     */
    public async checkIfFollowing(): Promise<void> {
        const followerId: string = this.sessionStoreService.sessionId() as string;
        const followingId = this.profileStatisticsStoreService.profileStatistics.getValueByKey('counters.profile_id');

        await this.wrapperCodeService.wrapFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<boolean | PostgrestError> = await this.supabaseClient.rpc(
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
            this.profileStatisticsStoreService.profileStatistics.mutateEntity(update)
        })
    }

    /**
     * Removes a follower if removeFollower is set to true. Else it removes a following
     *
     * @param {string} userId - The ID of the user.
     * @param {boolean} removeFollower - Indicates whether to remove the follower. Else remove the follower
     * @returns {Promise<any>}
     */
    public async manageFollowers(userId: string, removeFollower: boolean): Promise<any> {
        const loggedInUserId: string = this.sessionStoreService.sessionId() as string;

        this.wrapperCodeService.wrapFunction(async (): Promise<void> => {
            if (removeFollower) {
                const response: PostgrestSingleResponse<void | PostgrestError> = await this.supabaseClient.rpc(
                    'unfollow_transaction',
                    {
                        follower_id: userId,
                        following_id: loggedInUserId
                    }
                )
                .single()
                .throwOnError()
                this.profileStatisticsStoreService.profileStatistics.decrementKey('follower_counter')
            } else {
                const response: PostgrestSingleResponse<void | PostgrestError> = await this.supabaseClient.rpc(
                    'unfollow_transaction',
                    {
                        follower_id: loggedInUserId,
                        following_id: userId
                    }
                )
                .single()
                .throwOnError()

                this.profileStatisticsStoreService.profileStatistics.decrementKey('following_counter')
            }
        })
    }

    /**
     * Retrieves the followers and followings of the logged-in user.
     *
     * @return {Promise<any>} A promise that resolves to the follower and following data.
     */
    public async selectFollowersAndFollowings(): Promise<any> {
        const loggedInUserId: string = this.sessionStoreService.sessionId() as string;

        await this.wrapperCodeService.wrapFunction(async (): Promise<void> => {
            const followerResponse: PostgrestSingleResponse<Functions<'select_follower_of_user'>> = await this.supabaseClient.rpc(
                'select_follower_of_user',
                {
                    following_id: loggedInUserId
                }
            )
            .throwOnError()

            const followingResponse: PostgrestSingleResponse<Functions<'select_following_of_user'>> = await this.supabaseClient.rpc(
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
        })

    }

    public async followProfile() {
        const followerId: string = this.sessionStoreService.sessionId() as string;
        const followingId: string = this.profileStatisticsStoreService.profileStatistics.getValueByKey('counters.profile_id');
        await this.wrapperCodeService.wrapFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<Functions<'follow_transaction'>> = await this.supabaseClient.rpc(
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
            this.profileStatisticsStoreService.profileStatistics.incrementKey('follower_counter')
        })
    }

    public async unFollowProfile() {
        const followerId: string = this.sessionStoreService.sessionId() as string;
        const followingId: string = this.profileStatisticsStoreService.profileStatistics.getValueByKey('counters.profile_id');
        await this.wrapperCodeService.wrapFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<Functions<'unfollow_transaction'>> = await this.supabaseClient.rpc(
                'unfollow_transaction',
                {
                    follower_id: followerId,
                    following_id: followingId
                }
            ).throwOnError()

            const update: ProfileStatistics = {
                is_following: false,
            } as ProfileStatistics
            this.profileStatisticsStoreService.profileStatistics.mutateEntity(update)
            this.profileStatisticsStoreService.profileStatistics.decrementKey('follower_counter')
        })
    }
}
