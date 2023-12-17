import {Injectable} from '@angular/core';
import {PostgrestError, PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {FunctionTableReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {FollowingOfUserStoreService} from "./following-of-user.store.service";
import {ProfileCountersStoreService} from "./profile-counters.store.service";
import {supabaseClient} from "../../../auth/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class FollowingOfUserActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly followingOfUserStoreService: FollowingOfUserStoreService,
        private readonly profileCountersStoreService: ProfileCountersStoreService
    ) {
    }


    public async selectFollowingsOfUser(): Promise<any> {
        await this.followingOfUserStoreService.followingOfUser.wrapSelectFunction(async (): Promise<void> => {
            const followingResponse: PostgrestSingleResponse<FunctionTableReturn<'select_following_of_user'>> = await this.supabaseClient.rpc(
                'select_following_of_user'
            )
            .throwOnError()
            if (followingResponse.data) {
                this.followingOfUserStoreService.followingOfUser.setObjects(followingResponse.data)
            }
        })
    }

    public async removeFollowingOfUser(userId: string): Promise<any> {
        await this.followingOfUserStoreService.followingOfUser.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<void | PostgrestError> = await this.supabaseClient.rpc(
                'unfollow_transaction',
                {
                    following_id: userId
                }
            )
            .single()
            .throwOnError()

            this.followingOfUserStoreService.followingOfUser.removeObjectByPropertyValue(
                'id',
                userId
            )
            this.profileCountersStoreService.profileCounters.decrementKey('following_counter')
        }, true, 'Following removed!')
    }
}
