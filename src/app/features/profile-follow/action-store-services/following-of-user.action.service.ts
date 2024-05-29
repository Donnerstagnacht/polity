import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {FollowingOfUserStoreService} from "./following-of-user.store.service";
import {ProfileCountersStoreService} from "./profile-counters.store.service";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {ProfileActionService} from "../../profile/action-store-services/profile.action.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingOfUserActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseAuthenticatedClient;

    constructor(
        private readonly followingOfUserStoreService: FollowingOfUserStoreService,
        private readonly profileCountersStoreService: ProfileCountersStoreService,
        private readonly profileActionService: ProfileActionService
    ) {
    }


    public async readFollowingsOfUser(): Promise<any> {
        await this.followingOfUserStoreService.followingOfUser.wrapSelectFunction(async (): Promise<void> => {
            const followingResponse: PostgrestSingleResponse<SupabaseObjectReturn<'read_followings_of_user'>[]> = await this.supabaseClient.rpc(
                'read_followings_of_user'
            )
            .throwOnError()
            if (followingResponse.data) {
                const finalArray: SupabaseObjectReturn<'read_followings_of_user'>[] = await this.profileActionService.transformImageNamesToUrls(followingResponse.data, 'profile_image_')
                this.followingOfUserStoreService.followingOfUser.setObjects(finalArray)
            }
        })
    }

    public async removeFollowingOfUser(userId: string): Promise<any> {
        await this.followingOfUserStoreService.followingOfUser.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'unfollow_profile_transaction'>> = await this.supabaseClient.rpc(
                'unfollow_profile_transaction',
                {
                    _following_id: userId
                }
            )
            .single()
            .throwOnError()

            this.followingOfUserStoreService.followingOfUser.removeObjectByPropertyValue(
                'id_',
                userId
            )
            this.profileCountersStoreService.profileCounters.decrementKey('following_counter')
        }, true, 'Following removed!')
    }
}
