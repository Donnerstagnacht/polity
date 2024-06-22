DROP FUNCTION IF EXISTS authenticated.profiles_receive_notifications_from_follow_update(
    _new_status boolean
);
CREATE OR REPLACE FUNCTION authenticated.profiles_receive_notifications_from_follow_update(
    _new_status boolean
)
    RETURNS table
            (
                receive_follow_notifications_ boolean
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id := auth.uid();
    RETURN QUERY
        UPDATE hidden.profiles
            SET
                receive_follow_notifications = _new_status
            WHERE
                id = auth_user_id
            RETURNING receive_follow_notifications;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No profile found for user with id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;

END
$$;
