-- 1. Increment Following counter
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
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY (
        SELECT *
        FROM
            profiles_counters
        WHERE
            id = user_id
    );
END
$$;
