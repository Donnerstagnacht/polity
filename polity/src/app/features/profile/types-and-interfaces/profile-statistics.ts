import {ProfileMin} from "./profile";

export type ProfileStatistics = {
    follower_counter?: number,
    following_counter?: number,
    follower?: ProfileMin[],
    following?: ProfileMin[],
    is_following?: boolean,
    profile_id?: string
}
