import {Injectable} from '@angular/core';
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {supabasePublicClient} from "../../../auth/supabase-public-client";
import {GroupCountersStoreService} from "./group-counters.store.service";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class GroupCountersActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabasePublicClient;

    constructor(
        private readonly groupCountersStoreService: GroupCountersStoreService,
        private readonly groupStoreService: GroupStoreService
    ) {
    }

    public async selectGroupCounter(groupId: string): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_group_counters'>> = await this.supabaseClient.rpc(
                'read_group_counters',
                {_group_id: groupId}
            )
            .single()
            .throwOnError();
            if (response.data) {
                this.groupCountersStoreService.groupCounters.setObject(response.data);
            }
        })
    }

    public async checkIfFollowing(): Promise<void> {
        const followingId: string = this.groupStoreService.group.getValueByKey('id_')

        await this.groupCountersStoreService.groupCounters.wrapSelectFunction(async (): Promise<void> => {
            this.groupStoreService.group.uiFlagStore.setFlagTrue('isFollowingCheckLoading')
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'check_if_user_follows_group'>> = await this.supabaseClient.rpc(
                'check_if_user_follows_group',
                {
                    _following_id: followingId as string
                }
            )
            .single()
            .throwOnError();

            if (response.data) {
                this.groupStoreService.group.uiFlagStore.setFlagTrue('isFollowing')
            } else {
                console.log(response.error)
                this.groupStoreService.group.uiFlagStore.setFlagFalse('isFollowing')
            }
            this.groupStoreService.group.uiFlagStore.setFlagFalse('isFollowingCheckLoading')
        })
    }

    public async followGroup(): Promise<void> {
        const followingId: string = this.groupStoreService.group.getValueByKey('id_');
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'follow_group_transaction'>> = await this.supabaseClient.rpc(
                'follow_group_transaction',
                {
                    _following_id: followingId
                }
            ).throwOnError()

            this.groupStoreService.group.uiFlagStore.setFlagTrue('isFollowing')
            this.groupCountersStoreService.groupCounters.incrementKey('follower_counter')
        }, true, 'Successful followed!')
    }

    public async unFollowGroup(): Promise<void> {
        const followingId = this.groupStoreService.group.getValueByKey('id_');
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'unfollow_group_transaction'>> = await this.supabaseClient.rpc(
                'unfollow_group_transaction',
                {
                    _following_id: followingId
                }
            ).throwOnError()

            this.groupStoreService.group.uiFlagStore.setFlagFalse('isFollowing')
            this.groupCountersStoreService.groupCounters.decrementKey('follower_counter')
        }, true, 'Successful unfollowed!')
    }
}
