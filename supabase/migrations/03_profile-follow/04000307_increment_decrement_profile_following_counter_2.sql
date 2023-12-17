DROP FUNCTION IF EXISTS authenticated_access.increment_following_counter(user_id uuid);
CREATE OR REPLACE FUNCTION authenticated_access.increment_following_counter(user_id uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM SET_CONFIG('app.current_function', 'increment_following_counter', TRUE);
    UPDATE authenticated_access.profiles_counters
    SET
        following_counter = following_counter + 1
    WHERE
        id = user_id;
    PERFORM SET_CONFIG('app.current_function', NULL, TRUE);
END
$$;

DROP FUNCTION IF EXISTS authenticated_access.decrement_following_counter(user_id uuid);
CREATE OR REPLACE FUNCTION authenticated_access.decrement_following_counter(user_id uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM SET_CONFIG('app.current_function', 'decrement_following_counter', TRUE);
    UPDATE authenticated_access.profiles_counters
    SET
        following_counter = following_counter - 1
    WHERE
        id = user_id;
    PERFORM SET_CONFIG('app.current_function', NULL, TRUE);
END;
$$;
