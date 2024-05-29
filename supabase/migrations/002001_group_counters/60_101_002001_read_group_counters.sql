DROP FUNCTION IF EXISTS public.read_group_counter(
    _group_id uuid
);
CREATE OR REPLACE FUNCTION public.read_group_counter(
    _group_id uuid
)
    RETURNS table
            (
                group_id             uuid,
                follower_counter     bigint,
                following_counter    bigint,
                group_member_counter bigint
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
            group_member_counter
        FROM
            hidden.groups_counters
        WHERE
            id = _group_id
    );
END
$$;
