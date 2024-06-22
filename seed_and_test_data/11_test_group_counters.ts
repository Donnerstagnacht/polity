import * as jsonData from './11_group_counters.json';

export type GroupCounter = {
    id: string
    follower_counter: number
    following_counter: number
    unread_notifications_counter: number
    group_member_counter: number
}

const GroupCounters: GroupCounter[] = jsonData;

export const GROUP_COUNTER1: GroupCounter = GroupCounters[0];
export const GROUP_COUNTER2: GroupCounter = GroupCounters[1];
export const GROUP_COUNTER3: GroupCounter = GroupCounters[2];
