DROP FUNCTION IF EXISTS hidden.increment_profile_follower_counter(
    _user_id uuid
);
CREATE OR REPLACE FUNCTION hidden.increment_profile_follower_counter(
    _user_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    UPDATE hidden.profiles_counters
    SET
        follower_counter = follower_counter + 1
    WHERE
        id = _user_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No profile counter found for user with id %', _user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
