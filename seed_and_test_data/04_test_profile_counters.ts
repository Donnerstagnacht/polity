import * as jsonData from './04_profile_counters.json';

export type ProfileCounter = {
    id: string
    follower_counter: number
    following_counter: number
    unread_notifications_counter: number
    group_membership_counter: number
}

const ProfileCounters: ProfileCounter[] = jsonData;

export const PROFILE_COUNTER1: ProfileCounter = ProfileCounters[0];
export const PROFILE_COUNTER2: ProfileCounter = ProfileCounters[1];
export const PROFILE_COUNTER3: ProfileCounter = ProfileCounters[2];
export const PROFILE_COUNTER4: ProfileCounter = ProfileCounters[3];
export const PROFILE_COUNTER5: ProfileCounter = ProfileCounters[4];
export const PROFILE_COUNTER6: ProfileCounter = ProfileCounters[5];
export const PROFILE_COUNTER7: ProfileCounter = ProfileCounters[6];
export const PROFILE_COUNTER8: ProfileCounter = ProfileCounters[7];
export const PROFILE_COUNTER9: ProfileCounter = ProfileCounters[8];
export const PROFILE_COUNTER10: ProfileCounter = ProfileCounters[9];
