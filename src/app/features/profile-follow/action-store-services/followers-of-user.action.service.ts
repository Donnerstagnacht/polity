import {inject, Injectable} from '@angular/core';
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {FollowersOfUserStoreService} from "./followers-of-user.store.service";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {ProfileActionService} from "../../profile/action-store-services/profile.action.service";
import {ProfileStoreService} from "../../profile/action-store-services/profile.store.service";
import {ProfileCounterStore} from "./profile-counter-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowersOfUserActionService {
    private readonly supabaseClient = supabaseAuthenticatedClient;
    private profileCounterStore = inject(ProfileCounterStore)

    constructor(
        private followersOfUserStoreService: FollowersOfUserStoreService,
        // private profileCountersStoreService: ProfileCountersStoreService,
        private profileActionService: ProfileActionService,
        private profileStoreService: ProfileStoreService
    ) {
    }

    public async readFollowersOfUser(): Promise<any> {
        const followerResponse: PostgrestSingleResponse<SupabaseObjectReturn<'read_followers_of_user'>[]> = await this.followersOfUserStoreService.followersOfUser.manageSelectApiCall(async () => {
            return this.supabaseClient.rpc(
                'read_followers_of_user'
            )
        })
        if (followerResponse.data) {
            const finalArray: SupabaseObjectReturn<'read_followers_of_user'>[] = await this.profileActionService.transformImageNamesToUrls(followerResponse.data, 'profile_image_')
            this.followersOfUserStoreService.followersOfUser.setObjects(finalArray)
        }
    }

    public async removeFollowerOfUser(userId: string): Promise<any> {
        const response: PostgrestSingleResponse<SupabaseObjectReturn<'remove_follower_of_authenticated_user_transaction'>> = await this.followersOfUserStoreService.followersOfUser.manageUpdateApiCall(async () => {
            return this.supabaseClient.rpc(
                'remove_follower_of_authenticated_user_transaction',
                {
                    _follower_id: userId,
                }
            )
            .single()
        }, true, 'Follower removed!')

        if (!response.error) {
            this.followersOfUserStoreService.followersOfUser.removeObjectByPropertyValue(
                'id_',
                userId
            )
            this.profileCounterStore.decrement('follower_counter_')
            // this.profileCountersStoreService.profileCounters.decrementKey('follower_counter_')
        }
    }


    public async checkIfFollowing(): Promise<void> {
        const followingId: string = this.profileStoreService.profile.getValueByKey('profile_id_')

        const response: PostgrestSingleResponse<SupabaseObjectReturn<'check_if_user_follows_profile'>> = await this.profileStoreService.profile.manageSelectApiCall(async () => {
            this.profileStoreService.profile.uiFlagStore.setFlagTrue('isFollowingCheckLoading')
            return this.supabaseClient.rpc(
                'check_if_user_follows_profile',
                {
                    _following_id: followingId as string
                }
            )
            .single()
        })

        if (response.data) {
            this.profileStoreService.profile.uiFlagStore.setFlagTrue('isFollowing')
        } else {
            this.profileStoreService.profile.uiFlagStore.setFlagFalse('isFollowing')
        }
        this.profileStoreService.profile.uiFlagStore.setFlagFalse('isFollowingCheckLoading')
    }

    public async followProfile(): Promise<void> {
        const followingId: string = this.profileStoreService.profile.getValueByKey('profile_id_');
        const response: PostgrestSingleResponse<SupabaseObjectReturn<'follow_profile_transaction'>> = await this.profileStoreService.profile.manageUpdateApiCall(async () => {
            return this.supabaseClient.rpc(
                'follow_profile_transaction',
                {
                    _following_id: followingId
                })
        }, true, 'Successful followed!')
        if (!response.error) {
            this.profileStoreService.profile.uiFlagStore.setFlagTrue('isFollowing')
            this.profileCounterStore.increment('follower_counter_')
            // this.profileCountersStoreService.profileCounters.incrementKey('follower_counter_')
        }
    }

    public async unFollowProfile(): Promise<void> {
        const followingId = this.profileStoreService.profile.getValueByKey('profile_id_');
        const response: PostgrestSingleResponse<SupabaseObjectReturn<'unfollow_profile_transaction'>> = await this.profileStoreService.profile.manageUpdateApiCall(async () => {
            return this.supabaseClient.rpc(
                'unfollow_profile_transaction',
                {
                    _following_id: followingId
                }
            )
        }, true, 'Successful unfollowed!')
        if (!response.error) {
            this.profileStoreService.profile.uiFlagStore.setFlagFalse('isFollowing')
            this.profileCounterStore.decrement('follower_counter_')
            // this.profileCountersStoreService.profileCounters.decrementKey('follower_counter_')
        }
    }
}
