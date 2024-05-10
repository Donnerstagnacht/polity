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
        this.groupStoreService.group.uiFlagStore.setUiFlagTrue('isFollowingCheckLoading')
        console.log('check member status')
        const group_id: string | null = this.groupStoreService.group.getObjectId() // this.groupStoreService.group.getValueByKey('id')
        console.log(group_id)

        if (group_id) {
            await this.groupMembersStoreService.groupMembers.wrapSelectFunction(async (): Promise<void> => {
                this.groupStoreService.group.uiFlagStore.setUiFlagTrue('isGroupMemberLoading')
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'check_group_membership_status'>> = await this.supabaseClient.rpc(
                    'check_group_membership_status',
                    {
                        group_id_in: group_id
                    }
                )
                .single()
                .throwOnError();

                console.log(response.data)

                if (response.data) {
                    if (response.data === 'member') {
                        this.groupStoreService.group.uiFlagStore.setUiFlagTrue('isMember')
                        this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isBoardMember')
                        this.groupStoreService.groupMemberStatus.set('member')
                    } else if (response.data === 'board_member') {
                        this.groupStoreService.group.uiFlagStore.setUiFlagTrue('isMember')
                        this.groupStoreService.group.uiFlagStore.setUiFlagTrue('isBoardMember')
                        this.groupStoreService.groupMemberStatus.set('board_member')
                    } else if (response.data === 'requested') {
                        this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isMember')
                        this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isBoardMember')
                        this.groupStoreService.groupMemberStatus.set('requested')
                    } else if (response.data === 'invited') {
                        this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isMember')
                        this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isBoardMember')
                        this.groupStoreService.groupMemberStatus.set('invited')
                    } else {
                        this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isMember')
                        this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isBoardMember')
                        this.groupStoreService.groupMemberStatus.set('no_member')
                    }
                } else {
                    console.log(response.error)
                    this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isMember')
                    this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isBoardMember')
                }
                console.log(this.groupStoreService.group.uiFlagStore.getUiFlag('isMember')())
                console.log(this.groupStoreService.group.uiFlagStore.getUiFlag('isBoardMember')())
                this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isFollowingCheckLoading')
            })
        }

    }

    public async readGroupMembers(): Promise<any> {
        await this.groupMembersStoreService.groupMembers.wrapSelectFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
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
            }
        })
    }

    public async requestGroupMembership(): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            console.log(groupId)
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'create_group_member_request'>> = await this.supabaseClient.rpc(
                    'create_group_member_request',
                    {
                        group_id_in: groupId
                    }
                )
                .throwOnError()
                console.log(response, response.error)
                if (!response.error) {
                    console.log('no error')
                    this.groupStoreService.groupMemberStatus.set('requested');
                }
            }
        }, true, 'Successful requested group membership!')

    }

    public async acceptGroupMembershipRequest(membershipRequest: string): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'accept_group_membership_request_transaction'>> = await this.supabaseClient.rpc(
                'accept_group_membership_request_transaction',
                {
                    request_id: membershipRequest
                }
            )
            .throwOnError()
            this.groupCountersStoreService.groupCounters.incrementKey('member_counter')
        }, true, 'Successful accepted group membership!')
    }

    public async declineGroupMembershipRequest(membershipRequest: string): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'delete_group_member_request'>[]> = await this.supabaseClient.rpc(
                'delete_group_member_request',
                {
                    group_id_in: membershipRequest
                }
            )
            .throwOnError()
            this.groupCountersStoreService.groupCounters.decrementKey('member_counter')
        }, true, 'Successful declined group membership!')

    }

    public async inviteGroupMember(user_id: string): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'create_group_member_invitation'>> = await this.supabaseClient.rpc(
                    'create_group_member_invitation',
                    {
                        group_id: groupId,
                        member_id: user_id
                    }
                )
                .throwOnError()
                this.groupCountersStoreService.groupCounters.incrementKey('member_counter')
            }
        }, true, 'Successful requested group membership!')
    }

    public async accceptGroupInvitation(invitation_id: string): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'accept_group_invitation_transaction'>> = await this.supabaseClient.rpc(
                'accept_group_invitation_transaction',
                {
                    invitation_id: invitation_id
                }
            )
            .throwOnError()
            this.groupCountersStoreService.groupCounters.incrementKey('member_counter')
        }, true, 'Successful accepted group membership!')
    }

    public async removeGroupInvitation(invitation_id: string): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'delete_group_member_invitation_by_id'>[]> = await this.supabaseClient.rpc(
                    'delete_group_member_invitation_by_id',
                    {
                        invitation_id: invitation_id
                    }
                )
                .throwOnError()
                this.groupCountersStoreService.groupCounters.decrementKey('member_counter')
            }
        })
    }

    public async declineGroupInvitation(): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'delete_group_member_invitation'>[]> = await this.supabaseClient.rpc(
                    'delete_group_member_invitation',
                    {
                        group_id_in: groupId
                    }
                )
                .throwOnError()
                this.groupCountersStoreService.groupCounters.decrementKey('member_counter')
            }
        })
    }

    public async withDrawGroupRequest(): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'delete_group_member_request'>[]> = await this.supabaseClient.rpc(
                    'delete_group_member_request',
                    {
                        group_id_in: groupId
                    }
                )
                .throwOnError()
            }
        })
    }

    public async removeGroupMember(userId: string): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'delete_group_member_by_id'>> = await this.supabaseClient.rpc(
                    'delete_group_member_by_id',
                    {
                        membership_id: userId
                    }
                )
                .throwOnError()
                this.groupCountersStoreService.groupCounters.decrementKey('member_counter')
            }
        })


    }

    public async leaveGroup(): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'leave_group_member_transaction'>> = await this.supabaseClient.rpc(
                    'leave_group_member_transaction',
                    {
                        group_id_in: groupId
                    }
                )
                .throwOnError()

                this.groupStoreService.group.uiFlagStore.setUiFlagFalse('isMember')
                this.groupCountersStoreService.groupCounters.decrementKey('member_counter')
            }
        }, true, 'Successful left group!')

    }
}
