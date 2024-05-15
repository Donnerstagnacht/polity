DROP FUNCTION IF EXISTS public.read_profile_counters(
    user_id uuid
);
CREATE OR REPLACE FUNCTION public.read_profile_counters(
    user_id uuid
)
    RETURNS table
            (
                profile_id               uuid,
                follower_counter         bigint,
                following_counter        bigint,
                group_membership_counter bigint
                --unread_notifications_counter bigint
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY (
        SELECT
            authenticated_access.profiles_counters.id,
            authenticated_access.profiles_counters.follower_counter,
            authenticated_access.profiles_counters.following_counter,
            authenticated_access.profiles_counters.group_membership_counter
        FROM
            authenticated_access.profiles_counters
        WHERE
            id = user_id
    );
END
$$;
