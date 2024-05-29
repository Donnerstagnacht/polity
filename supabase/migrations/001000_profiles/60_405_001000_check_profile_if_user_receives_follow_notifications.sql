DROP FUNCTION IF EXISTS hidden.check_profile_if_user_receives_follow_notifications(
    _user_id uuid
);
CREATE OR REPLACE FUNCTION hidden.check_profile_if_user_receives_follow_notifications(
    _user_id uuid
)
    RETURNS boolean
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    receives_follow_notifications_status boolean;
BEGIN
    SELECT
        receive_follow_notifications
    INTO receives_follow_notifications_status
    FROM
        hidden.profiles
    WHERE
        id = _user_id;
    RETURN receives_follow_notifications_status;
END
$$;
