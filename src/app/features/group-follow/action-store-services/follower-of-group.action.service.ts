import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseArrayReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../auth/supabase-client";
import {GroupActionService} from "../../group/action-store-service/group.action.service";
import {GroupCountersStoreService} from "./group-counters.store.service";
import {FollowerOfGroupStoreService} from "./follower-of-group.store.service";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowerOfGroupActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private followersOfGroupStoreService: FollowerOfGroupStoreService,
        private groupCountersStoreService: GroupCountersStoreService,
        private groupActionService: GroupActionService,
        private groupStoreService: GroupStoreService
    ) {
    }

    public async readFollowersOfGroup(): Promise<any> {
        await this.followersOfGroupStoreService.followersOfGroup.wrapSelectFunction(async (): Promise<void> => {
            const groupId: string = this.groupStoreService.group.getValueByKey('id');
            const followerResponse: PostgrestSingleResponse<SupabaseArrayReturn<'read_follower_of_group'>> = await this.supabaseClient.rpc(
                'read_follower_of_group',
                {
                    group_id_in: groupId
                }
            )
            .throwOnError()
            if (followerResponse.data) {
                const finalArray: SupabaseArrayReturn<'select_follower_of_user'> = await this.groupActionService.transformImageNamesToUrls(followerResponse.data, 'profile_image')
                this.followersOfGroupStoreService.followersOfGroup.setObjects(finalArray)
            }
        })
    }

    public async removeFollowerOfGroup(userId: string): Promise<any> {
        await this.followersOfGroupStoreService.followersOfGroup.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string = this.groupStoreService.group.getValueByKey('id');
            const response: PostgrestSingleResponse<SupabaseArrayReturn<'remove_group_follower_transaction'>> = await this.supabaseClient.rpc(
                'remove_group_follower_transaction',
                {
                    follower_id: userId,
                    group_id_in: groupId
                }
            )
            .single()
            .throwOnError()

            this.followersOfGroupStoreService.followersOfGroup.removeObjectByPropertyValue(
                'id',
                userId
            )
            this.groupCountersStoreService.groupCounters.decrementKey('follower_counter')
        }, true, 'Follower removed!')
    }
}
