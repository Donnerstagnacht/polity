import {Injectable} from '@angular/core';
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {supabaseClient} from "../../../auth/supabase-client";
import {SupabaseObjectReturn,} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupMemberStoreService} from "./group-member.store.service";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";
import {GroupCountersStoreService} from "../../group-follow/action-store-services/group-counters.store.service";
import {GroupActionService} from "../../group/action-store-service/group.action.service";

@Injectable({
    providedIn: 'root'
})
export class GroupMemberActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly groupMembersStoreService: GroupMemberStoreService,
        private readonly groupStoreService: GroupStoreService,
        private readonly groupActionService: GroupActionService,
        private readonly groupCountersStoreService: GroupCountersStoreService
    ) {
    }

    public async checkMemberStatus(): Promise<void> {
        console.log('check member status')
        const group_id: string = this.groupCountersStoreService.groupCounters.getValueByKey('group_id')

        await this.groupMembersStoreService.groupMembers.wrapSelectFunction(async (): Promise<void> => {
            this.groupStoreService.group.uiFlagStore.setUiFlagTrue('isGroupMemberLoading')
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'check_group_membership_status'>> = await this.supabaseClient.rpc(
                'check_group_membership_status',
                {
                    group_id_in: group_id as string
                }
            )
            .single()
            .throwOnError();
            console.log('response', response)

            //     if (response.data) {
            //         console.log(response.data)
            //         this.groupStoreService.group.uiFlagStore.setUiFlagTrue('isFollowing')
            //     } else {
            //         console.log(response.error)
            //         this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isFollowing')
            //     }
            //     this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isFollowingCheckLoading')
        })
    }

    public async readGroupMembers(): Promise<any> {
        await this.groupMembersStoreService.groupMembers.wrapSelectFunction(async (): Promise<void> => {
            const groupId: string = this.groupStoreService.group.getValueByKey('id');
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_group_members'>[]> = await this.supabaseClient.rpc(
                'read_group_members',
                {
                    group_id_in: groupId
                }
            )
            .throwOnError()
            if (response.data) {
                const finalArray: SupabaseObjectReturn<'read_group_members'>[] = await this.groupActionService.transformImageNamesToUrls(response.data, 'profile_image')
                this.groupMembersStoreService.groupMembers.setObjects(finalArray)
            }
        })
    }

    public async requestGroupMembership(): Promise<void> {

    }

    public async inviteGroupMember(): Promise<void> {

    }

    public async confirmGroupMembership(): Promise<void> {

    }

    public async declineGroupMembership(): Promise<void> {

    }

    public async removeGroupMember(userId: string): Promise<void> {


    }

    public async leaveGroup(): Promise<void> {

    }
}
