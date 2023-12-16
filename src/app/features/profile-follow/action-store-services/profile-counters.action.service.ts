import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {ProfileCountersStoreService} from "./profile-counters.store.service";
import {FunctionSingleReturn, FunctionTableReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {supabaseClient} from "../../../auth/supabase-client";
import {ProfileStoreService} from "../../profile/action-store-services/profile.store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileCountersActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly profileCountersStoreService: ProfileCountersStoreService,
        private readonly profileStoreService: ProfileStoreService
    ) {
    }

    public async selectProfileCounter(userId: string): Promise<void> {
        await this.profileCountersStoreService.profileCounters.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionSingleReturn<'select_following_counter'>> = await this.supabaseClient.rpc(
                'select_following_counter',
                {user_id: userId}
            )
            .single()
            .throwOnError();
            if (response.data) {
                this.profileCountersStoreService.profileCounters.setObject(response.data);
            }
        })
    }

    public async checkIfFollowing(): Promise<void> {
        const followingId: string = this.profileCountersStoreService.profileCounters.getValueByKey('profile_id')

        await this.profileCountersStoreService.profileCounters.wrapSelectFunction(async (): Promise<void> => {
            this.profileStoreService.profile.uiFlagStore.setUiFlagTrue('isFollowingCheckLoading')
            const response: PostgrestSingleResponse<FunctionTableReturn<'check_if_following'>> = await this.supabaseClient.rpc(
                'check_if_following',
                {
                    following_id: followingId as string
                }
            )
            .single()
            .throwOnError();

            if (response.data) {
                this.profileStoreService.profile.uiFlagStore.setUiFlagTrue('isFollowing')
            } else {
                this.profileStoreService.profile.uiFlagStore.setUiFlagFalse('isFollowing')
            }
            this.profileStoreService.profile.uiFlagStore.setUiFlagFalse('isFollowingCheckLoading')
        })
    }

    public async followProfile() {
        const followingId: string = this.profileCountersStoreService.profileCounters.getValueByKey('profile_id');
        await this.profileCountersStoreService.profileCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionTableReturn<'follow_transaction'>> = await this.supabaseClient.rpc(
                'follow_transaction',
                {
                    following_id: followingId
                }
            ).throwOnError()

            this.profileStoreService.profile.uiFlagStore.setUiFlagTrue('isFollowing')
            this.profileCountersStoreService.profileCounters.incrementKey('follower_counter')
        })
    }

    public async unFollowProfile() {
        const followingId = this.profileCountersStoreService.profileCounters.getValueByKey('profile_id');
        await this.profileCountersStoreService.profileCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionTableReturn<'unfollow_transaction'>> = await this.supabaseClient.rpc(
                'unfollow_transaction',
                {
                    following_id: followingId
                }
            ).throwOnError()

            this.profileStoreService.profile.uiFlagStore.setUiFlagFalse('isFollowing')
            this.profileCountersStoreService.profileCounters.decrementKey('follower_counter')
        })
    }

}
