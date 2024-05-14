import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {FollowersOfUserStoreService} from "./followers-of-user.store.service";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {ProfileCountersStoreService} from "./profile-counters.store.service";
import {supabaseClient} from "../../../auth/supabase-client";
import {ProfileActionService} from "../../profile/action-store-services/profile.action.service";
import {ProfileStoreService} from "../../profile/action-store-services/profile.store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowersOfUserActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private followersOfUserStoreService: FollowersOfUserStoreService,
        private profileCountersStoreService: ProfileCountersStoreService,
        private profileActionService: ProfileActionService,
        private profileStoreService: ProfileStoreService
    ) {
    }

    public async selectFollowersOfUser(): Promise<any> {
        await this.followersOfUserStoreService.followersOfUser.wrapSelectFunction(async (): Promise<void> => {
            const followerResponse: PostgrestSingleResponse<SupabaseObjectReturn<'read_follower_of_user'>[]> = await this.supabaseClient.rpc(
                'read_follower_of_user'
            )
            .throwOnError()
            if (followerResponse.data) {
                const finalArray: SupabaseObjectReturn<'read_follower_of_user'>[] = await this.profileActionService.transformImageNamesToUrls(followerResponse.data, 'profile_image')
                this.followersOfUserStoreService.followersOfUser.setObjects(finalArray)
            }
        })
    }

    public async removeFollowerOfUser(userId: string): Promise<any> {
        await this.followersOfUserStoreService.followersOfUser.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'remove_follower_transaction'>> = await this.supabaseClient.rpc(
                'remove_follower_transaction',
                {
                    follower_id: userId,
                }
            )
            .single()
            .throwOnError()

            this.followersOfUserStoreService.followersOfUser.removeObjectByPropertyValue(
                'id',
                userId
            )
            this.profileCountersStoreService.profileCounters.decrementKey('follower_counter')
        }, true, 'Follower removed!')
    }


    public async checkIfFollowing(): Promise<void> {
        const followingId: string = this.profileCountersStoreService.profileCounters.getValueByKey('profile_id')

        await this.profileCountersStoreService.profileCounters.wrapSelectFunction(async (): Promise<void> => {
            this.profileStoreService.profile.uiFlagStore.setFlagTrue('isFollowingCheckLoading')
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'check_if_following'>> = await this.supabaseClient.rpc(
                'check_if_following',
                {
                    following_id: followingId as string
                }
            )
            .single()
            .throwOnError();

            if (response.data) {
                this.profileStoreService.profile.uiFlagStore.setFlagTrue('isFollowing')
            } else {
                this.profileStoreService.profile.uiFlagStore.setFlagFalse('isFollowing')
            }
            this.profileStoreService.profile.uiFlagStore.setFlagFalse('isFollowingCheckLoading')
        })
    }

    public async followProfile(): Promise<void> {
        const followingId: string = this.profileCountersStoreService.profileCounters.getValueByKey('profile_id');
        await this.profileCountersStoreService.profileCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'follow_transaction'>> = await this.supabaseClient.rpc(
                'follow_transaction',
                {
                    following_id: followingId
                }
            ).throwOnError()

            this.profileStoreService.profile.uiFlagStore.setFlagTrue('isFollowing')
            this.profileCountersStoreService.profileCounters.incrementKey('follower_counter')
        }, true, 'Successful followed!')
    }

    public async unFollowProfile(): Promise<void> {
        const followingId = this.profileCountersStoreService.profileCounters.getValueByKey('profile_id');
        await this.profileCountersStoreService.profileCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'unfollow_transaction'>> = await this.supabaseClient.rpc(
                'unfollow_transaction',
                {
                    following_id: followingId
                }
            ).throwOnError()

            this.profileStoreService.profile.uiFlagStore.setFlagFalse('isFollowing')
            this.profileCountersStoreService.profileCounters.decrementKey('follower_counter')
        }, true, 'Successful unfollowed!')
    }
}
