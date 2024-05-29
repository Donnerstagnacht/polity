DROP FUNCTION IF EXISTS public.read_profile_counters(
    _user_id uuid
);
CREATE OR REPLACE FUNCTION public.read_profile_counters(
    _user_id uuid
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
            id,
            follower_counter,
            following_counter,
            group_membership_counter
        FROM
            hidden.profiles_counters
        WHERE
            id = _user_id
    );
END
$$;
