import {Injectable} from '@angular/core';
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {supabaseClient} from "../../../auth/supabase-client";
import {SupabaseFunctionTableReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupMemberStoreService} from "./group-member.store.service";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";
import {GroupCountersStoreService} from "../../group-follow/action-store-services/group-counters.store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupMemberActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly groupMembersStoreService: GroupMemberStoreService,
        private readonly groupStoreService: GroupStoreService,
        private readonly groupCountersStoreService: GroupCountersStoreService
    ) {
    }

    public async checkMemberStatus(): Promise<void> {
        console.log('check member status')
        const group_id: string = this.groupCountersStoreService.groupCounters.getValueByKey('group_id')

        await this.groupMembersStoreService.groupMembers.wrapSelectFunction(async (): Promise<void> => {
            this.groupStoreService.group.uiFlagStore.setUiFlagTrue('isGroupMemberLoading')
            const response: PostgrestSingleResponse<SupabaseFunctionTableReturn<'check_group_membership_status'>> = await this.supabaseClient.rpc(
                'check_group_membership_status',
                {
                    group_id_in: group_id as string
                }
            )
            .single()
            .throwOnError();
            console.log('response', response)

            if (response.data) {
                console.log(response.data)
                this.groupStoreService.group.uiFlagStore.setUiFlagTrue('isFollowing')
            } else {
                console.log(response.error)
                this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isFollowing')
            }
            this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isFollowingCheckLoading')
        })
    }
}
