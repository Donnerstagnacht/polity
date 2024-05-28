DROP FUNCTION IF EXISTS authenticated_access.decrement_follower_counter(user_id uuid);
CREATE OR REPLACE FUNCTION authenticated_access.decrement_follower_counter(user_id uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM SET_CONFIG('app.current_function', 'decrement_follower_counter', TRUE);
    UPDATE authenticated_access.profiles_counters
    SET
        follower_counter = follower_counter - 1
    WHERE
        id = user_id;
    PERFORM SET_CONFIG('app.current_function', NULL, TRUE);
END;
$$;
