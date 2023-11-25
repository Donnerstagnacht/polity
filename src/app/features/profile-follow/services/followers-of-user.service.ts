import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {Functions} from "../../../../../supabase/types/supabase.shorthand-types";
import {SessionStoreService} from "../../../auth/services/session-store.service";
import {FollowersOfUserStoreService} from "./followers-of-user-store.service";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {ProfileCountersStoreService} from "./profile-counters-store.service";
import {supabaseClient} from "../../../auth/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class FollowersOfUserService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private sessionStoreService: SessionStoreService,
        private followersOfUserStoreService: FollowersOfUserStoreService,
        private profileCountersStoreService: ProfileCountersStoreService
    ) {
    }

    public async selectFollowersOfUser(): Promise<any> {
        await this.followersOfUserStoreService.followersOfUser.wrapSelectFunction(async (): Promise<void> => {
            const loggedInUserId: string = this.sessionStoreService.getSessionId() as string;
            const followerResponse: PostgrestSingleResponse<Functions<'select_follower_of_user'>> = await this.supabaseClient.rpc(
                'select_follower_of_user',
                {
                    following_id: loggedInUserId
                }
            )
            .throwOnError()
            if (followerResponse.data) {
                this.followersOfUserStoreService.followersOfUser.setObjects(followerResponse.data)
            }
        })
    }

    public async removeFollowerOfUser(userId: string): Promise<any> {
        await this.followersOfUserStoreService.followersOfUser.wrapUpdateFunction(async (): Promise<void> => {
            const loggedInUserId: string = this.sessionStoreService.getSessionId() as string;
            const response: PostgrestSingleResponse<Functions<'unfollow_transaction'>> = await this.supabaseClient.rpc(
                'unfollow_transaction',
                {
                    follower_id: userId,
                    following_id: loggedInUserId
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
