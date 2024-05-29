DROP FUNCTION IF EXISTS public.read_profile_notification_settings();
CREATE OR REPLACE FUNCTION public.read_profile_notification_settings()
    RETURNS table
            (
                receive_follow_notifications_ boolean
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

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No profile found for user with id %', auth_user
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
