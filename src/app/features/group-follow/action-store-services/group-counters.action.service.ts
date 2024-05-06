import {Injectable} from '@angular/core';
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {supabaseClient} from "../../../auth/supabase-client";
import {GroupCountersStoreService} from "./group-counters.store.service";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";
import {
    FunctionSingleReturn,
    SupabaseFunctionTableReturn
} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class GroupCountersActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly groupCountersStoreService: GroupCountersStoreService,
        private readonly groupStoreService: GroupStoreService
    ) {
    }

    public async selectGroupCounter(groupId: string): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionSingleReturn<'read_group_following_counter'>> = await this.supabaseClient.rpc(
                'read_group_following_counter',
                {group_id_in: groupId}
            )
            .single()
            .throwOnError();
            if (response.data) {
                this.groupCountersStoreService.groupCounters.setObject(response.data);
            }
        })
    }

    public async checkIfFollowing(): Promise<void> {
        const followingId: string = this.groupCountersStoreService.groupCounters.getValueByKey('group_id')

        await this.groupCountersStoreService.groupCounters.wrapSelectFunction(async (): Promise<void> => {
            this.groupStoreService.group.uiFlagStore.setUiFlagTrue('isFollowingCheckLoading')
            const response: PostgrestSingleResponse<SupabaseFunctionTableReturn<'check_if_following_group'>> = await this.supabaseClient.rpc(
                'check_if_following_group',
                {
                    following_id: followingId as string
                }
            )
            .single()
            .throwOnError();

            if (response.data) {
                this.groupStoreService.group.uiFlagStore.setUiFlagTrue('isFollowing')
            } else {
                console.log(response.error)
                this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isFollowing')
            }
            this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isFollowingCheckLoading')
        })
    }

    public async followGroup(): Promise<void> {
        const followingId: string = this.groupCountersStoreService.groupCounters.getValueByKey('group_id');
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseFunctionTableReturn<'follow_group_transaction'>> = await this.supabaseClient.rpc(
                'follow_group_transaction',
                {
                    following_id: followingId
                }
            ).throwOnError()

            this.groupStoreService.group.uiFlagStore.setUiFlagTrue('isFollowing')
            this.groupCountersStoreService.groupCounters.incrementKey('follower_counter')
        }, true, 'Successful followed!')
    }

    public async unFollowGroup(): Promise<void> {
        const followingId = this.groupCountersStoreService.groupCounters.getValueByKey('group_id');
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseFunctionTableReturn<'unfollow_group_transaction'>> = await this.supabaseClient.rpc(
                'unfollow_group_transaction',
                {
                    following_id: followingId
                }
            ).throwOnError()

            this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isFollowing')
            this.groupCountersStoreService.groupCounters.decrementKey('follower_counter')
        }, true, 'Successful unfollowed!')
    }
}
