import {Injectable} from '@angular/core';
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

    public async selectProfileStatistics(userId: string) {
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

    public async checkIfFollowing() {
        const session = this.sessionStoreService.selectSession();
        const followerId = session()?.user.id;

        const profile = this.profileStatisticsStoreService.selectProfileStatistics()
        const followingId = profile()?.profile_id;

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
                // console.log('true', response.data)
                return true
            } else {
                // console.log('false', response.data)
                this.profileStatisticsStoreService.mutateIsFollowing(response.data as boolean)
                return false
            }
        } catch (error: any) {
            this.notificationService.updateNotification(error.message, true);
            return error;
        }
    }

    public async toggleFollow(isFollowing: boolean) {
        const session = this.sessionStoreService.selectSession();
        const followerId = session()?.user.id;

        const profile = this.profileStatisticsStoreService.selectProfileStatistics()
        const followingId = profile()?.profile_id;
        console.log(isFollowing)
        console.log(followerId)
        console.log(followingId)

        try {
            let response;
            if (isFollowing && followingId) {
                console.log('FOLLOW')
                response = await this.followProfile(followerId, followingId)
                this.profileStatisticsStoreService.mutateIsFollowing(true)
                this.profileStatisticsStoreService.incrementFollowerCounter()
            } else if (followingId) {
                console.log('UNFOLLOW')
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

    public async manageFollowers(userId: string, removeFollower: boolean) {
        const session = this.sessionStoreService.selectSession();
        const loggedInUserId = session()?.user.id;

        try {
            if (removeFollower) {
                console.log('remove follower')
                const response = await this.supabase.rpc(
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
                console.log('remove following', loggedInUserId, userId)
                const response = await this.supabase.rpc(
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
            console.log('success')

        } catch (error: any) {
            this.notificationService.updateNotification(error.message, true);
            return error;
        }
    }

    public removeFollower() {
        return this.supabase.rpc(
            '',
            {}
        )
    }

    public removeFollowing() {
        return this.supabase.rpc(
            '',
            {}
        )
    }

    public async selectFollowersAndFollowings() {
        const session = this.sessionStoreService.selectSession();
        const loggedInUserId = session()?.user.id;

        try {
            const followerResponse = await this.supabase.rpc(
                'select_follower_of_user',
                {
                    following_id: loggedInUserId
                }
            )
            // .single()
            .throwOnError()
            console.log('follower', followerResponse.data)

            const followingResponse = await this.supabase.rpc(
                'select_following_of_user',
                {
                    follower_id: loggedInUserId
                }
            )
            // .single()
            .throwOnError()
            console.log('following', followingResponse.data)

            let test: ProfileStatistics = {
                follower: followerResponse.data,
                following: followingResponse.data,
            };
            this.profileStatisticsStoreService.setProfileStatistics(test)

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
