DROP FUNCTION IF EXISTS hidden.increment_group_follower_counter(
    _group_id_in uuid
);
CREATE OR REPLACE FUNCTION hidden.increment_group_follower_counter(
    _group_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM SET_CONFIG('app.current_function', 'increment_follower_counter', TRUE);
    UPDATE hidden.groups_counters
    SET
        follower_counter = follower_counter + 1
    WHERE
        id = _group_id;
    PERFORM SET_CONFIG('app.current_function', NULL, TRUE);

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group found counter for group id % ', _group_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
