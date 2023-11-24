DROP FUNCTION IF EXISTS hidden_functions.increment_notification_counter(
    user_id uuid
);
CREATE OR REPLACE FUNCTION hidden_functions.increment_notification_counter(
    user_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    UPDATE public.profiles_counters
    SET
        unread_notifications_counter = unread_notifications_counter + 1
    WHERE
        id = user_id;
END
$$;
