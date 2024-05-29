DROP FUNCTION IF EXISTS authenticated.read_group_counters(
    _group_id uuid
);
CREATE OR REPLACE FUNCTION authenticated.read_group_counters(
    _group_id uuid
)
    RETURNS table
            (
                group_id_             uuid,
                follower_counter_     bigint,
                following_counter_    bigint,
                group_member_counter_ bigint
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

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group found counter for group id % ', _group_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
