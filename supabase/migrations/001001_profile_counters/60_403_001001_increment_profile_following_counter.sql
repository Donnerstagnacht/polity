DROP FUNCTION IF EXISTS hidden.increment_following_counter(
    _user_id uuid
);
CREATE OR REPLACE FUNCTION hidden.increment_following_counter(
    _user_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM SET_CONFIG('app.current_function', 'increment_following_counter', TRUE);
    UPDATE hidden.profiles_counters
    SET
        following_counter = following_counter + 1
    WHERE
        id = _user_id;
    PERFORM SET_CONFIG('app.current_function', NULL, TRUE);
END
$$;

