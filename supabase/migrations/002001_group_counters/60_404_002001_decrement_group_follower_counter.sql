DROP FUNCTION IF EXISTS hidden.decrement_group_follower_counter(
    _group_id uuid
);
CREATE OR REPLACE FUNCTION hidden.decrement_group_follower_counter(
    _group_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM SET_CONFIG('app.current_function', 'decrement_follower_counter', TRUE);
    UPDATE hidden.groups_counters
    SET
        follower_counter = follower_counter - 1
    WHERE
        id = _group_id;
    PERFORM SET_CONFIG('app.current_function', NULL, TRUE);
END;
$$;
