import {Injectable} from '@angular/core';
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {supabasePublicClient} from "../../../auth/supabase-public-client";
import {SupabaseObjectReturn,} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupMemberStoreService} from "./group-member.store.service";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";
import {GroupCountersStoreService} from "../../group-follow/action-store-services/group-counters.store.service";
import {GroupActionService} from "../../group/action-store-service/group.action.service";
import {GroupsOfUserStoreService} from "../../profile-groups/action-store-services/groups-of-user.store.service";
import {
    GroupRequestsOfUserStoreService
} from "../../profile-groups/action-store-services/group-requests-of-user.store.service";
import {
    GroupInvitationsOfUserStoreService
} from "../../profile-groups/action-store-services/group-invitations-of-user.store.service";
import {GroupInvitationsStoreService} from "./group-invitations.store.service";
import {GroupRequestsStoreService} from "./group-requests.store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupMemberActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabasePublicClient;

    constructor(
        private readonly groupMembersStoreService: GroupMemberStoreService,
        private readonly groupStoreService: GroupStoreService,
        private readonly groupActionService: GroupActionService,
        private readonly groupCountersStoreService: GroupCountersStoreService,
        private readonly groupsOfUserStoreService: GroupsOfUserStoreService,
        private readonly groupRequestsOfUserStoreService: GroupRequestsOfUserStoreService,
        private readonly groupInvitationsOfUserStoreService: GroupInvitationsOfUserStoreService,
        private readonly groupInvitationsStoreService: GroupInvitationsStoreService,
        private readonly groupRequestsStoreService: GroupRequestsStoreService
    ) {
    }

    public async checkMemberStatus(): Promise<void> {
        this.groupStoreService.group.uiFlagStore.setFlagTrue('isGroupMembershipStatusLoading')
        const group_id: string | null = this.groupStoreService.group.getObjectId() // this.groupStoreService.group.getValueByKey('id')
        console.log('requested group id', group_id)

        if (group_id) {
            await this.groupMembersStoreService.groupMembers.wrapSelectFunction(async (): Promise<void> => {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'check_group_membership_status'>> = await this.supabaseClient.rpc(
                    'check_group_membership_status',
                    {
                        _group_id: group_id
                    }
                )
                .single()
                .throwOnError();

                console.log('check member status', response.data)

                if (response.data) {
                    if (response.data === 'member') {
                        this.groupStoreService.group.uiFlagStore.setFlagTrue('isMember')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isBoardMember')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isInvited')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isRequested')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isNotMember')
                        this.groupStoreService.groupMemberStatus.set('member')
                    } else if (response.data === 'board_member') {
                        this.groupStoreService.group.uiFlagStore.setFlagTrue('isMember')
                        this.groupStoreService.group.uiFlagStore.setFlagTrue('isBoardMember')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isInvited')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isRequested')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isNotMember')
                        this.groupStoreService.groupMemberStatus.set('board_member')
                    } else if (response.data === 'requested') {
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isMember')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isBoardMember')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isInvited')
                        this.groupStoreService.group.uiFlagStore.setFlagTrue('isRequested')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isNotMember')
                        this.groupStoreService.groupMemberStatus.set('requested')
                    } else if (response.data === 'invited') {
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isMember')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isBoardMember')
                        this.groupStoreService.group.uiFlagStore.setFlagTrue('isInvited')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isRequested')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isNotMember')
                        this.groupStoreService.groupMemberStatus.set('invited')
                    } else {
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isMember')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isBoardMember')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isInvited')
                        this.groupStoreService.group.uiFlagStore.setFlagFalse('isRequested')
                        this.groupStoreService.group.uiFlagStore.setFlagTrue('isNotMember')
                        this.groupStoreService.groupMemberStatus.set('no_member')
                    }
                } else {
                    console.log(response.error)
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isBoardMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isInvited')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isRequested')
                    this.groupStoreService.group.uiFlagStore.setFlagTrue('isNotMember')
                    this.groupStoreService.groupMemberStatus.set('no_member')
                }
                this.groupStoreService.group.uiFlagStore.setFlagFalse('isGroupMembershipStatusLoading')
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
                        _group_id: groupId
                    }
                )
                .throwOnError()
                if (response.data) {
                    const finalArray: SupabaseObjectReturn<'read_group_members'>[] = await this.groupActionService.transformImageNamesToUrls(response.data, 'profile_image_')
                    this.groupMembersStoreService.groupMembers.setObjects(finalArray)
                }
            }
        })
    }

    public async requestGroupMembership(): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'create_group_member_request'>> = await this.supabaseClient.rpc(
                    'create_group_member_request',
                    {
                        _group_id: groupId
                    }
                )
                .throwOnError()
                if (!response.error) {
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isBoardMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isInvited')
                    this.groupStoreService.group.uiFlagStore.setFlagTrue('isRequested')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isNotMember')
                    this.groupStoreService.groupMemberStatus.set('requested')
                }
            }
        }, true, 'Successful requested group membership!')

    }

    public async acceptGroupMembershipRequest(membershipRequest: string): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'accept_group_membership_request_transaction'>> = await this.supabaseClient.rpc(
                'accept_group_membership_request_transaction',
                {
                    _request_id: membershipRequest
                }
            )
            .throwOnError()
            if (!response.error) {
                this.groupCountersStoreService.groupCounters.incrementKey('member_counter')
                this.groupRequestsStoreService.groupRequests.removeObjectByPropertyValue('id_', membershipRequest);
            }
        }, true, 'Successful accepted group membership!')
    }

    public async declineGroupMembershipRequest(
        membershipRequest: string,
        fromGroup: boolean = false
    ): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'delete_group_member_request'>> = await this.supabaseClient.rpc(
                'delete_group_member_request',
                {
                    _group_id: membershipRequest
                }
            )
            .throwOnError()
            if (!response.error) {
                if (fromGroup) {
                    this.groupRequestsStoreService.groupRequests.removeObjectByPropertyValue('id_', membershipRequest);
                } else {
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isBoardMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isInvited')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isRequested')
                    this.groupStoreService.group.uiFlagStore.setFlagTrue('isNotMember')
                    this.groupStoreService.groupMemberStatus.set('no_member')
                }
            }
        }, true, 'Successful declined group membership!')

    }

    public async inviteGroupMember(user_id: string): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'create_group_member_invitation'>> = await this.supabaseClient.rpc(
                    'create_group_member_invitation',
                    {
                        _group_id: groupId,
                        _member_id: user_id
                    }
                )
                .throwOnError()
            }
        }, true, 'Successful requested group membership!')
    }

    public async accceptGroupInvitation(): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'accept_group_invitation_transaction'>> = await this.supabaseClient.rpc(
                    'accept_group_invitation_transaction',
                    {
                        _group_id: groupId
                    }
                )
                .throwOnError()
                if (!response.error) {
                    this.groupCountersStoreService.groupCounters.incrementKey('group_member_counter')
                    this.groupStoreService.group.uiFlagStore.setFlagTrue('isMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isBoardMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isInvited')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isRequested')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isNotMember')
                    this.groupStoreService.groupMemberStatus.set('member')
                }
            }
        }, true, 'Successful accepted group membership!')
    }

    public async accceptGroupInvitationById(invitation_id: string): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'accept_group_invitation_by_id_transaction'>> = await this.supabaseClient.rpc(
                'accept_group_invitation_by_id_transaction',
                {
                    _invitation_id: invitation_id
                }
            )
            .throwOnError()
            console.log(response)
            if (!response.error) {
                this.groupInvitationsOfUserStoreService.groupInvitationsOfUser.removeObjectByPropertyValue('id_', invitation_id);
                this.groupCountersStoreService.groupCounters.incrementKey('member_counter')
            }
        }, true, 'Successful accepted group membership!')
    }

    public async removeGroupInvitation(
        invitation_id: string,
        fromGroup: boolean = false
    ): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'delete_group_member_invitation_by_id'>> = await this.supabaseClient.rpc(
                'delete_group_member_invitation_by_id',
                {
                    _invitation_id: invitation_id
                }
            )
            .throwOnError()
            if (!response.error) {
                if (fromGroup) {
                    this.groupInvitationsStoreService.groupInvitations.removeObjectByPropertyValue('id_', invitation_id);
                } else {
                    this.groupInvitationsOfUserStoreService.groupInvitationsOfUser.removeObjectByPropertyValue('id_', invitation_id);
                }
            }
        }, true, 'Successful removed group invitation!')
    }

    public async declineGroupInvitation(): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'delete_group_member_invitation'>> = await this.supabaseClient.rpc(
                    'delete_group_member_invitation',
                    {
                        _group_id: groupId
                    }
                )
                .throwOnError()
                if (!response.error) {
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isBoardMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isInvited')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isRequested')
                    this.groupStoreService.group.uiFlagStore.setFlagTrue('isNotMember')
                    this.groupStoreService.groupMemberStatus.set('no_member')
                }
            }
        })
    }

    public async withDrawGroupRequest(): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'delete_group_member_request'>> = await this.supabaseClient.rpc(
                    'delete_group_member_request',
                    {
                        _group_id: groupId
                    }
                )
                .throwOnError()
                if (!response.error) {
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isBoardMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isInvited')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isRequested')
                    this.groupStoreService.group.uiFlagStore.setFlagTrue('isNotMember')
                    this.groupStoreService.groupMemberStatus.set('no_member')
                }
            }
        })
    }

    public async deleteGroupRequestById(
        requestId: string,
        fromGroup: boolean = false
    ): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'delete_group_member_request_by_id'>> = await this.supabaseClient.rpc(
                'delete_group_member_request_by_id',
                {
                    _request_id: requestId
                }
            )
            .throwOnError()
            if (!response.error) {
                if (fromGroup) {
                    this.groupRequestsStoreService.groupRequests.removeObjectByPropertyValue('id_', requestId);
                } else {
                    this.groupRequestsOfUserStoreService.groupRequestsOfUser.removeObjectByPropertyValue('id_', requestId);
                }
            }
        }, true, 'Successful withdrawn group membership request!')
    }

    public async removeGroupMember(
        membershipId: string,
        fromGroup: boolean = false
    ): Promise<void> {
        console.log('removing group member', membershipId)
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'leave_group_by_membership_id_transaction'>> = await this.supabaseClient.rpc(
                'leave_group_by_membership_id_transaction',
                {
                    _membership_id: membershipId
                }
            )
            .throwOnError();
            if (!response.error) {
                if (fromGroup) {
                    this.groupMembersStoreService.groupMembers.removeObjectByPropertyValue('id_', membershipId);
                } else {
                    this.groupsOfUserStoreService.groupsOfUser.removeObjectByPropertyValue('id_', membershipId);
                }
            }
        }, true, 'Successful removed group member!')
    }

    public async leaveGroup(): Promise<void> {
        await this.groupCountersStoreService.groupCounters.wrapUpdateFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'leave_group_member_transaction'>> = await this.supabaseClient.rpc(
                    'leave_group_member_transaction',
                    {
                        _group_id: groupId
                    }
                )
                .throwOnError()

                if (!response.error) {
                    this.groupCountersStoreService.groupCounters.decrementKey('group_member_counter')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isBoardMember')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isInvited')
                    this.groupStoreService.group.uiFlagStore.setFlagFalse('isRequested')
                    this.groupStoreService.group.uiFlagStore.setFlagTrue('isNotMember')
                    this.groupStoreService.groupMemberStatus.set('no_member')
                }
            }
        }, true, 'Successful left group!')
    }
}
