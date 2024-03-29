DROP FUNCTION IF EXISTS public.select_following_counter(
    user_id uuid
);
CREATE OR REPLACE FUNCTION public.select_following_counter(
    user_id uuid
)
    RETURNS table
            (
                profile_id        uuid,
                follower_counter  bigint,
                following_counter bigint
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
            authenticated_access.profiles_counters.following_counter
        FROM
            authenticated_access.profiles_counters
        WHERE
            id = user_id
    );
END
$$;
