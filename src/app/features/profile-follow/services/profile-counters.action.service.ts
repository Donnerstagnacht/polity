import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {ProfileCountersStoreService} from "./profile-counters.store.service";
import {SessionStoreService} from "../../../auth/services/session-store.service";
import {Functions, Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {ProfileStoreService} from "../../profile/services/profile.store.service";
import {supabaseClient} from "../../../auth/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class ProfileCountersActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly profileCountersStoreService: ProfileCountersStoreService,
        private readonly profileStoreService: ProfileStoreService
    ) {
    }

    public async selectProfileCounter(userId: string): Promise<void> {
        await this.profileCountersStoreService.profileCounters.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<Tables<'profiles_counters'>> = await this.supabaseClient.rpc(
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
        const followerId: string = this.sessionStoreService.getSessionId() as string;
        const followingId: string = this.profileCountersStoreService.profileCounters.getValueByKey('profile_id')

        await this.profileCountersStoreService.profileCounters.wrapSelectFunction(async (): Promise<void> => {
            this.profileStoreService.profile.uiFlagStore.setUiFlagTrue('isFollowingCheckLoading')
            const response: PostgrestSingleResponse<Functions<'check_if_following'>> = await this.supabaseClient.rpc(
                'check_if_following',
                {
                    follower_id: followerId,
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
        const followerId: string = this.sessionStoreService.getSessionId() as string;
        const followingId: string = this.profileCountersStoreService.profileCounters.getValueByKey('profile_id');
        await this.profileCountersStoreService.profileCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<Functions<'follow_transaction'>> = await this.supabaseClient.rpc(
                'follow_transaction',
                {
                    follower_id: followerId,
                    following_id: followingId
                }
            ).throwOnError()

            this.profileStoreService.profile.uiFlagStore.setUiFlagTrue('isFollowing')
            this.profileCountersStoreService.profileCounters.incrementKey('follower_counter')
        })
    }

    public async unFollowProfile() {
        const followerId: string = this.sessionStoreService.getSessionId() as string;
        const followingId = this.profileCountersStoreService.profileCounters.getValueByKey('profile_id');
        await this.profileCountersStoreService.profileCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<Functions<'unfollow_transaction'>> = await this.supabaseClient.rpc(
                'unfollow_transaction',
                {
                    follower_id: followerId,
                    following_id: followingId
                }
            ).throwOnError()

            this.profileStoreService.profile.uiFlagStore.setUiFlagFalse('isFollowing')
            this.profileCountersStoreService.profileCounters.decrementKey('follower_counter')
        })
    }

}
