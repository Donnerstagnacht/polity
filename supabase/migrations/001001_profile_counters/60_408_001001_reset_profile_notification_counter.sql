DROP FUNCTION IF EXISTS public.reset_profile_notification_counter();
CREATE OR REPLACE FUNCTION public.reset_profile_notification_counter()
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id = auth.uid();
    UPDATE hidden.profiles_counters
    SET
        unread_notifications_counter = 0
    WHERE
        id = auth_user_id;
END
$$;
