DROP FUNCTION IF EXISTS authenticated.read_profile_counters(
    _user_id uuid
);
CREATE OR REPLACE FUNCTION authenticated.read_profile_counters(
    _user_id uuid
)
    RETURNS table
            (
                profile_id_               uuid,
                follower_counter_         bigint,
                following_counter_        bigint,
                group_membership_counter_ bigint
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
            group_membership_counter
        FROM
            hidden.profiles_counters
        WHERE
            id = _user_id
    );

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No profile counter found for user with id %', _user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
