import {Injectable} from '@angular/core';
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {FollowingOfUserStoreService} from "./following-of-user.store.service";
import {ProfileCountersStoreService} from "./profile-counters.store.service";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {ProfileActionService} from "../../profile/action-store-services/profile.action.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingOfUserActionService {
    private readonly supabaseClient = supabaseAuthenticatedClient;

    constructor(
        private readonly followingOfUserStoreService: FollowingOfUserStoreService,
        private readonly profileCountersStoreService: ProfileCountersStoreService,
        private readonly profileActionService: ProfileActionService
    ) {
    }


    public async readFollowingsOfUser(): Promise<any> {
        const followingResponse: PostgrestSingleResponse<SupabaseObjectReturn<'read_followings_of_user'>[]> = await this.followingOfUserStoreService.followingOfUser.manageSelectApiCall(async () => {
            return this.supabaseClient.rpc(
                'read_followings_of_user'
            )
        })
        if (followingResponse.data) {
            const finalArray: SupabaseObjectReturn<'read_followings_of_user'>[] = await this.profileActionService.transformImageNamesToUrls(followingResponse.data, 'profile_image_')
            this.followingOfUserStoreService.followingOfUser.setObjects(finalArray)
        }
    }

    public async removeFollowingOfUser(userId: string): Promise<any> {
        const response: PostgrestSingleResponse<SupabaseObjectReturn<'unfollow_profile_transaction'>> = await this.followingOfUserStoreService.followingOfUser.manageUpdateApiCall(async () => {
            return this.supabaseClient.rpc(
                'unfollow_profile_transaction',
                {
                    _following_id: userId
                }
            )
            .single()

        }, true, 'Following removed!')

        if (!response.error) {
            this.followingOfUserStoreService.followingOfUser.removeObjectByPropertyValue(
                'id_',
                userId
            )
            this.profileCountersStoreService.profileCounters.decrementKey('following_counter')
        }
    }
}
