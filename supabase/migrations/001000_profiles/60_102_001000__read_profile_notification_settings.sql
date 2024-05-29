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
    authenticated_user uuid;
BEGIN
    authenticated_user := auth.uid();
    RETURN QUERY (
        SELECT
            profiles.receive_follow_notifications
        FROM
            hidden.profiles
        WHERE
            id = authenticated_user
    );
END
$$;
