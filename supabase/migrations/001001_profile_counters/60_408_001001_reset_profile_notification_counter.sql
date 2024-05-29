DROP FUNCTION IF EXISTS public.reset_profile_notification_counter();
CREATE OR REPLACE FUNCTION public.reset_profile_notification_counter()
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    authenticated_user uuid;
BEGIN
    authenticated_user = auth.uid();
    UPDATE hidden.profiles_counters
    SET
        unread_notifications_counter = 0
    WHERE
        id = authenticated_user;
END
$$;
