DROP FUNCTION IF EXISTS public.read_profile_notification_settings();
CREATE OR REPLACE FUNCTION public.read_profile_notification_settings()
    RETURNS table
            (
                receive_follow_notifications boolean
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user uuid;
BEGIN
    auth_user := auth.uid();
    RETURN QUERY (
        SELECT
            receive_follow_notifications
        FROM
            hidden.profiles
        WHERE
            id = auth_user
    );
END
$$;
