import {Functions, Tables} from "../../../../../supabase/types/supabase.shorthand-types";

export type ProfileStatistics = {
    counters?: Tables<'profiles_counters'>,
    // follower_counter?: number,
    // following_counter?: number,
    follower: Functions<'select_follower_of_user'> | null | undefined,
    // follower?: ProfileMin[],

    following?: Functions<'select_following_of_user'> | null,
    is_following?: boolean,
}
