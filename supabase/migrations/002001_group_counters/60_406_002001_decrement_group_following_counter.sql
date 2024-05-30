DROP FUNCTION IF EXISTS hidden.decrement_group_following_counter(
    _group_id uuid
);
CREATE OR REPLACE FUNCTION hidden.decrement_group_following_counter(
    _group_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    UPDATE hidden.groups_counters
    SET
        following_counter = following_counter - 1
    WHERE
        id = _group_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group found counter for group id % ', _group_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
