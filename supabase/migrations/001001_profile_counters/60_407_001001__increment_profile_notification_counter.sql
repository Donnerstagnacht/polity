DROP FUNCTION IF EXISTS hidden.increment_profile_notification_counter(
    _user_id uuid
);
CREATE OR REPLACE FUNCTION hidden.increment_profile_notification_counter(
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
        unread_notifications_counter = unread_notifications_counter + 1
    WHERE
        id = _user_id;
END
$$;
