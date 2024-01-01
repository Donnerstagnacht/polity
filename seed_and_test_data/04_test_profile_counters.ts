import * as profiles_jsonData from './02_profiles.json';
import * as following_jsonData from './03_following_profiles_relationships.json';

import {FollowingRelationship} from "./03_test_following_relationships";
import {Profile} from "./02_test_profiles";


export type ProfileCounter = {
    id: string;
    follower_counter: number;
    following_counter: number;
    unread_notifications_counter: number
}

const FollowingRelationship: FollowingRelationship[] = following_jsonData;
const Profiles: Profile[] = profiles_jsonData;

function findFollowerOfId(id: string): number {
    return FollowingRelationship.filter(item => item.following === id).length;
}

function findFollowingOfId(id: string): number {
    return FollowingRelationship.filter(item => item.follower === id).length;
}

const PROFILE_COUNTER1: ProfileCounter = {
    id: profiles_jsonData[0].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[0].id),
    following_counter: findFollowingOfId(profiles_jsonData[0].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER2: ProfileCounter = {
    id: profiles_jsonData[1].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[1].id),
    following_counter: findFollowingOfId(profiles_jsonData[1].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER3: ProfileCounter = {
    id: profiles_jsonData[2].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[2].id),
    following_counter: findFollowingOfId(profiles_jsonData[2].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER4: ProfileCounter = {
    id: profiles_jsonData[3].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[3].id),
    following_counter: findFollowingOfId(profiles_jsonData[3].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER5: ProfileCounter = {
    id: profiles_jsonData[4].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[4].id),
    following_counter: findFollowingOfId(profiles_jsonData[4].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER6: ProfileCounter = {
    id: profiles_jsonData[5].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[5].id),
    following_counter: findFollowingOfId(profiles_jsonData[5].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER7: ProfileCounter = {
    id: profiles_jsonData[6].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[6].id),
    following_counter: findFollowingOfId(profiles_jsonData[6].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER8: ProfileCounter = {
    id: profiles_jsonData[7].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[7].id),
    following_counter: findFollowingOfId(profiles_jsonData[7].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER9: ProfileCounter = {
    id: profiles_jsonData[8].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[8].id),
    following_counter: findFollowingOfId(profiles_jsonData[8].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER10: ProfileCounter = {
    id: profiles_jsonData[9].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[9].id),
    following_counter: findFollowingOfId(profiles_jsonData[9].id),
    unread_notifications_counter: 0
}

export {
    PROFILE_COUNTER1,
    PROFILE_COUNTER2,
    PROFILE_COUNTER3,
    PROFILE_COUNTER4,
    PROFILE_COUNTER5,
    PROFILE_COUNTER6,
    PROFILE_COUNTER7,
    PROFILE_COUNTER8,
    PROFILE_COUNTER9,
    PROFILE_COUNTER10
};
