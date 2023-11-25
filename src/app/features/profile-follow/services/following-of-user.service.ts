import {Injectable} from '@angular/core';
import {PostgrestError, PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../shared/services/supabase-client";
import {Functions} from "../../../../../supabase/types/supabase.shorthand-types";
import {FollowingOfUserStoreService} from "./following-of-user-store.service";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {ProfileCountersStoreService} from "./profile-counters-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingOfUserService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly followingOfUserStoreService: FollowingOfUserStoreService,
        private readonly sessionStoreService: SessionStoreService,
        private readonly profileCountersStoreService: ProfileCountersStoreService
    ) {
    }


    public async selectFollowingsOfUser(): Promise<any> {
        await this.followingOfUserStoreService.followingOfUser.wrapSelectFunction(async (): Promise<void> => {
            const loggedInUserId: string = this.sessionStoreService.getSessionId() as string;
            const followingResponse: PostgrestSingleResponse<Functions<'select_following_of_user'>> = await this.supabaseClient.rpc(
                'select_following_of_user',
                {
                    follower_id: loggedInUserId
                }
            )
            .throwOnError()
            if (followingResponse.data) {
                this.followingOfUserStoreService.followingOfUser.setObjects(followingResponse.data)
            }
        })
    }

    public async removeFollowingOfUser(userId: string): Promise<any> {
        this.followingOfUserStoreService.followingOfUser.wrapUpdateFunction(async (): Promise<void> => {
            const loggedInUserId: string = this.sessionStoreService.getSessionId() as string;
            const response: PostgrestSingleResponse<void | PostgrestError> = await this.supabaseClient.rpc(
                'unfollow_transaction',
                {
                    follower_id: loggedInUserId,
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
        })
    }
}
