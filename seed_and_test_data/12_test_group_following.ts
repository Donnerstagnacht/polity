import * as jsonData from './12_group_following.json';

export type GroupFollowings = {
    follower: string
    following: string
}

const GroupFollowingRelationships: GroupFollowings[] = jsonData;

export const GROUP_FOLLOWING_RELATIONSHIP1: GroupFollowings = GroupFollowingRelationships[0];
export const GROUP_FOLLOWING_RELATIONSHIP2: GroupFollowings = GroupFollowingRelationships[1];
export const GROUP_FOLLOWING_RELATIONSHIP3: GroupFollowings = GroupFollowingRelationships[2];
export const GROUP_FOLLOWING_RELATIONSHIP4: GroupFollowings = GroupFollowingRelationships[3];
export const GROUP_FOLLOWING_RELATIONSHIP5: GroupFollowings = GroupFollowingRelationships[4];
