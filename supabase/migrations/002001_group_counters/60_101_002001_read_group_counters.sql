DROP FUNCTION IF EXISTS public.read_group_counter(
    group_id_in uuid
);
CREATE OR REPLACE FUNCTION public.read_group_counter(
    group_id_in uuid
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
            hidden.groups_counters.id,
            hidden.groups_counters.follower_counter,
            hidden.groups_counters.following_counter,
            hidden.groups_counters.group_member_counter
        FROM
            hidden.groups_counters
        WHERE
            id = group_id_in
    );
END
$$;
