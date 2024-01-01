import * as jsonData from './03_following_profiles_relationships.json';

export type FollowingRelationship = {
    follower: string;
    following: string;
}

const FollowingRelationships: FollowingRelationship[] = jsonData;

const FOLLOWER1: FollowingRelationship = FollowingRelationships[0]
const FOLLOWER2: FollowingRelationship = FollowingRelationships[1]
const FOLLOWER3: FollowingRelationship = FollowingRelationships[2]
const FOLLOWER4: FollowingRelationship = FollowingRelationships[3]
const FOLLOWER5: FollowingRelationship = FollowingRelationships[4]
const FOLLOWER6: FollowingRelationship = FollowingRelationships[5]
const FOLLOWER7: FollowingRelationship = FollowingRelationships[6]
const FOLLOWER8: FollowingRelationship = FollowingRelationships[7]
const FOLLOWER9: FollowingRelationship = FollowingRelationships[8]
const FOLLOWER10: FollowingRelationship = FollowingRelationships[9]

export {
    FOLLOWER1,
    FOLLOWER2,
    FOLLOWER3,
    FOLLOWER4,
    FOLLOWER5,
    FOLLOWER6,
    FOLLOWER7,
    FOLLOWER8,
    FOLLOWER9,
    FOLLOWER10
};
