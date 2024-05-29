DROP FUNCTION IF EXISTS hidden.decrement_profile_follower_counter(
    _user_id uuid
);
CREATE OR REPLACE FUNCTION hidden.decrement_profile_follower_counter(
    _user_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM SET_CONFIG('app.current_function', 'decrement_follower_counter', TRUE);
    UPDATE hidden.profiles_counters
    SET
        follower_counter = follower_counter - 1
    WHERE
        id = _user_id;
    PERFORM SET_CONFIG('app.current_function', NULL, TRUE);

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No profile counter found for user with id %', _user_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
