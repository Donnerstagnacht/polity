import {Injectable} from '@angular/core';
import {PostgrestError, PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../auth/supabase-client";
import {GroupCountersStoreService} from "./group-counters.store.service";
import {FollowingOfGroupStoreService} from "./following-of-group.store.service";
import {GroupActionService} from "../../group/action-store-service/group.action.service";
import {SupabaseArrayReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingOfGroupActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly followingOfGroupStoreService: FollowingOfGroupStoreService,
        private readonly groupCountersStoreService: GroupCountersStoreService,
        private readonly groupActionService: GroupActionService,
        private readonly groupStoreService: GroupStoreService
    ) {
    }

    public async readFollowingsOfGroup(): Promise<any> {
        await this.followingOfGroupStoreService.followingOfGroup.wrapSelectFunction(async (): Promise<void> => {
            const groupId: string = this.groupStoreService.group.getValueByKey('id');
            const followingResponse: PostgrestSingleResponse<SupabaseArrayReturn<'read_following_of_group'>> = await this.supabaseClient.rpc(
                'read_following_of_group',
                {
                    group_id_in: groupId
                }
            )
            .throwOnError()
            if (followingResponse.data) {
                const finalArray: SupabaseArrayReturn<'select_following_of_user'> = await this.groupActionService.transformImageNamesToUrls(followingResponse.data, 'profile_image')
                this.followingOfGroupStoreService.followingOfGroup.setObjects(finalArray)
            }
        })
    }

    public async removeFollowingOfUser(userId: string): Promise<any> {
        await this.followingOfGroupStoreService.followingOfGroup.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<void | PostgrestError> = await this.supabaseClient.rpc(
                'unfollow_group_transaction',
                {
                    following_id: userId
                }
            )
            .single()
            .throwOnError()

            this.followingOfGroupStoreService.followingOfGroup.removeObjectByPropertyValue(
                'id',
                userId
            )
            this.groupCountersStoreService.groupCounters.decrementKey('following_counter')
        }, true, 'Following removed!')
    }
}