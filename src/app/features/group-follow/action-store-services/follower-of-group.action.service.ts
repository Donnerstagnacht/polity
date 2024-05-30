import {Injectable} from '@angular/core';
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {GroupActionService} from "../../group/action-store-service/group.action.service";
import {GroupCountersStoreService} from "./group-counters.store.service";
import {FollowerOfGroupStoreService} from "./follower-of-group.store.service";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowerOfGroupActionService {
    private readonly supabaseClient = supabaseAuthenticatedClient;

    constructor(
        private followersOfGroupStoreService: FollowerOfGroupStoreService,
        private groupCountersStoreService: GroupCountersStoreService,
        private groupActionService: GroupActionService,
        private groupStoreService: GroupStoreService
    ) {
    }

    public async readFollowersOfGroup(): Promise<any> {
        const groupId: string | null = this.groupStoreService.group.getObjectId()
        if (groupId) {
            const followerResponse: PostgrestSingleResponse<SupabaseObjectReturn<'read_followers_of_group'>[]> = await this.followersOfGroupStoreService.followersOfGroup.manageSelectApiCall(async () => {
                return this.supabaseClient.rpc(
                    'read_followers_of_group',
                    {
                        _group_id: groupId
                    }
                )
            })
            if (followerResponse.data) {
                const finalArray: SupabaseObjectReturn<'read_followers_of_user'>[] = await this.groupActionService.transformImageNamesToUrls(followerResponse.data, 'profile_image_')
                this.followersOfGroupStoreService.followersOfGroup.setObjects(finalArray)
            }
        }
    }

    public async removeFollowerOfGroup(userId: string): Promise<any> {
        const groupId: string = this.groupStoreService.group.getValueByKey('id_');
        if (groupId) {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'remove_group_follower_transaction'>[]> = await this.followersOfGroupStoreService.followersOfGroup.manageUpdateApiCall(async () => {
                return this.supabaseClient.rpc(
                    'remove_group_follower_transaction',
                    {
                        _follower_id: userId,
                        _group_id_in: groupId
                    }
                )
                .single()
            }, true, 'Follower removed!')

            if (!response.error) {
                this.followersOfGroupStoreService.followersOfGroup.removeObjectByPropertyValue(
                    'id_',
                    userId
                )
                this.groupCountersStoreService.groupCounters.decrementKey('follower_counter')
            }
        }
    }
}
