DROP FUNCTION IF EXISTS public.reset_notification_counter(
    user_id uuid
);
CREATE OR REPLACE FUNCTION public.reset_notification_counter(
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
        unread_notifications_counter = 0
    WHERE
        id = user_id;
END
$$;
