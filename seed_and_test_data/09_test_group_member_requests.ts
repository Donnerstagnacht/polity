import * as jsonData from './09_group_member_requests.json';

export type GroupMemberRequest = {
    id: string;
    group_id: string;
    member_id: string;
    member_type: string;
};

export const GROUP_MEMBER_REQUESTS: GroupMemberRequest[] = jsonData;

export const GROUP_MEMBER_REQUEST1: GroupMemberRequest = GROUP_MEMBER_REQUESTS[0];
export const GROUP_MEMBER_REQUEST2: GroupMemberRequest = GROUP_MEMBER_REQUESTS[1];
export const GROUP_MEMBER_REQUEST3: GroupMemberRequest = GROUP_MEMBER_REQUESTS[2];
export const GROUP_MEMBER_REQUEST4: GroupMemberRequest = GROUP_MEMBER_REQUESTS[3];
export const GROUP_MEMBER_REQUEST5: GroupMemberRequest = GROUP_MEMBER_REQUESTS[4];
export const GROUP_MEMBER_REQUEST6: GroupMemberRequest = GROUP_MEMBER_REQUESTS[5];
