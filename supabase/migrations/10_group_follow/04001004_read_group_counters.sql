DROP FUNCTION IF EXISTS public.read_group_following_counter(
    group_id_in uuid
);
CREATE OR REPLACE FUNCTION public.read_group_following_counter(
    group_id_in uuid
)
    RETURNS table
            (
                group_id          uuid,
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
            authenticated_access.groups_counters.id,
            authenticated_access.groups_counters.follower_counter,
            authenticated_access.groups_counters.following_counter
        FROM
            authenticated_access.groups_counters
        WHERE
            id = group_id_in
    );
END
$$;
