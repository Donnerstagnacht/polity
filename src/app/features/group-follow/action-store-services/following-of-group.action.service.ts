import {Injectable} from '@angular/core';
import {PostgrestError, PostgrestSingleResponse} from "@supabase/supabase-js";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {GroupCountersStoreService} from "./group-counters.store.service";
import {FollowingOfGroupStoreService} from "./following-of-group.store.service";
import {GroupActionService} from "../../group/action-store-service/group.action.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingOfGroupActionService {
    private readonly supabaseClient = supabaseAuthenticatedClient;

    constructor(
        private readonly followingOfGroupStoreService: FollowingOfGroupStoreService,
        private readonly groupCountersStoreService: GroupCountersStoreService,
        private readonly groupActionService: GroupActionService,
        private readonly groupStoreService: GroupStoreService
    ) {
    }

    public async readFollowingsOfGroup(): Promise<any> {
        const groupId: string | null = this.groupStoreService.group.getObjectId();
        if (groupId) {
            const followingResponse: PostgrestSingleResponse<SupabaseObjectReturn<'read_followings_of_group'>[]> = await this.followingOfGroupStoreService.followingOfGroup.manageSelectApiCall(async () => {
                return this.supabaseClient.rpc(
                    'read_followings_of_group',
                    {
                        _group_id: groupId
                    }
                )
            })
            if (followingResponse.data) {
                const finalArray: SupabaseObjectReturn<'read_followings_of_user'>[] = await this.groupActionService.transformImageNamesToUrls(followingResponse.data, 'profile_image_')
                this.followingOfGroupStoreService.followingOfGroup.setObjects(finalArray)
            }
        }
    }

    public async removeFollowingOfUser(userId: string): Promise<any> {
        const response: PostgrestSingleResponse<void | PostgrestError> = await this.followingOfGroupStoreService.followingOfGroup.manageUpdateApiCall(async () => {
            return this.supabaseClient.rpc(
                'unfollow_group_transaction',
                {
                    _following_id: userId
                }
            )
            .single()
        }, true, 'Following removed!')

        if (!response.error) {
            this.followingOfGroupStoreService.followingOfGroup.removeObjectByPropertyValue(
                'id_',
                userId
            )
            this.groupCountersStoreService.groupCounters.decrementKey('following_counter')
        }
    }
}
