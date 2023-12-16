import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {FunctionTableReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {FollowersOfUserStoreService} from "./followers-of-user.store.service";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {ProfileCountersStoreService} from "./profile-counters.store.service";
import {supabaseClient} from "../../../auth/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class FollowersOfUserActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private followersOfUserStoreService: FollowersOfUserStoreService,
        private profileCountersStoreService: ProfileCountersStoreService
    ) {
    }

    public async selectFollowersOfUser(): Promise<any> {
        await this.followersOfUserStoreService.followersOfUser.wrapSelectFunction(async (): Promise<void> => {
            const followerResponse: PostgrestSingleResponse<FunctionTableReturn<'select_follower_of_user'>> = await this.supabaseClient.rpc(
                'select_follower_of_user'
            )
            .throwOnError()
            if (followerResponse.data) {
                this.followersOfUserStoreService.followersOfUser.setObjects(followerResponse.data)
            }
        })
    }

    public async removeFollowerOfUser(userId: string): Promise<any> {
        await this.followersOfUserStoreService.followersOfUser.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionTableReturn<'remove_follower_transaction'>> = await this.supabaseClient.rpc(
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
        })
    }
}
