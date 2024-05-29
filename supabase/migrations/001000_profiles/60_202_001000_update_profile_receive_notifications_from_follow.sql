DROP FUNCTION IF EXISTS authenticated.update_profile_receive_notifications_from_follow(
    _new_status boolean
);
CREATE OR REPLACE FUNCTION authenticated.update_profile_receive_notifications_from_follow(
    _new_status boolean
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id := auth.uid();
    UPDATE hidden.profiles
    SET
        receive_follow_notifications = _new_status
    WHERE
        id = auth_user_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No profile found for user with id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;

END
$$;
