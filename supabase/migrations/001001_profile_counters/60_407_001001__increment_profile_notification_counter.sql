DROP FUNCTION IF EXISTS authenticated_access.increment_profile_notification_counter(
    user_id uuid
);
CREATE OR REPLACE FUNCTION authenticated_access.increment_profile_notification_counter(
    user_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    UPDATE authenticated_access.profiles_counters
    SET
        unread_notifications_counter = unread_notifications_counter + 1
    WHERE
        id = user_id;
END
$$;
