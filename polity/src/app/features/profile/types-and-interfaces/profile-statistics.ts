import {ProfileMin} from "./profile";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";

export type ProfileStatistics = {
    counters?: Tables<'profiles_counters'>,
    // follower_counter?: number,
    // following_counter?: number,
    follower?: ProfileMin[],
    following?: ProfileMin[],
    is_following?: boolean,
}
