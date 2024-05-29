DROP FUNCTION IF EXISTS authenticated_access.decrement_group_follower_counter(
    group_id_in uuid
);
CREATE OR REPLACE FUNCTION authenticated_access.decrement_group_follower_counter(
    group_id_in uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM SET_CONFIG('app.current_function', 'decrement_follower_counter', TRUE);
    UPDATE authenticated_access.groups_counters
    SET
        follower_counter = follower_counter - 1
    WHERE
        id = group_id_in;
    PERFORM SET_CONFIG('app.current_function', NULL, TRUE);
END;
$$;
