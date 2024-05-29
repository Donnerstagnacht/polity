import {Injectable} from '@angular/core';
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {FollowingGroupsOfUserStoreService} from "./following-groups-of-user.store.service";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {ProfileCountersStoreService} from "./profile-counters.store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingGroupsOfUserActionService {
    private readonly supabaseClient = supabaseAuthenticatedClient;

    constructor(
        private readonly profileCountersStoreService: ProfileCountersStoreService,
        private readonly followingGroupsOfUserStoreService: FollowingGroupsOfUserStoreService) {
    }

    public async readFollowingGroupsOfUser(): Promise<any> {
        await this.followingGroupsOfUserStoreService.followingGroupsOfUser.wrapSelectFunction(async (): Promise<void> => {
            const followingResponse: PostgrestSingleResponse<SupabaseObjectReturn<'read_group_followings_of_user'>[]> = await this.supabaseClient.rpc(
                'read_group_followings_of_user'
            )
            .throwOnError()
            if (followingResponse.data) {
                // const finalArray: SupabaseObjectReturn<'read_following_of_user'>[] = await this.profileActionService.transformImageNamesToUrls(followingResponse.data, 'img_url')
                this.followingGroupsOfUserStoreService.followingGroupsOfUser.setObjects(followingResponse.data)
            }
        })
    }


    public async removeFollowingGroupOfUser(groupId: string): Promise<any> {
        await this.followingGroupsOfUserStoreService.followingGroupsOfUser.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'unfollow_group_transaction'>> = await this.supabaseClient.rpc(
                'unfollow_group_transaction',
                {
                    _following_id: groupId
                }
            )
            .single()
            .throwOnError()

            this.followingGroupsOfUserStoreService.followingGroupsOfUser.removeObjectByPropertyValue(
                'id_',
                groupId
            )
            this.profileCountersStoreService.profileCounters.decrementKey('following_counter')
        }, true, 'Following group removed!')
    }
}
