import * as jsonData from './10_group_member_invitations.json';

export type GroupMemberInvitation = {
    id: string,
    group_id: string,
    member_id: string,
    member_type: string
};

export const groupMemberInvitations: GroupMemberInvitation[] = jsonData;

export const groupMemberInvitation1: GroupMemberInvitation = groupMemberInvitations[0];
export const groupMemberInvitation2: GroupMemberInvitation = groupMemberInvitations[1];
export const groupMemberInvitation3: GroupMemberInvitation = groupMemberInvitations[2];
export const groupMemberInvitation4: GroupMemberInvitation = groupMemberInvitations[3];
export const groupMemberInvitation5: GroupMemberInvitation = groupMemberInvitations[4];
export const groupMemberInvitation6: GroupMemberInvitation = groupMemberInvitations[5];
export const groupMemberInvitation7: GroupMemberInvitation = groupMemberInvitations[6];
export const groupMemberInvitation8: GroupMemberInvitation = groupMemberInvitations[7];
export const groupMemberInvitation9: GroupMemberInvitation = groupMemberInvitations[8];
