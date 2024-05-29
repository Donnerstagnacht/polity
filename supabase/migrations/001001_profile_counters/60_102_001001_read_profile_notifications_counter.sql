DROP FUNCTION IF EXISTS public.read_unread_notifications_counter();
CREATE OR REPLACE FUNCTION public.read_unread_notifications_counter()
    RETURNS table
            (
                profile_id                   uuid,
                unread_notifications_counter bigint
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id := auth.uid();
    RETURN QUERY (
        SELECT
            id AS profile_id,
            unread_notifications_counter
        FROM
            hidden.profiles_counters
        WHERE
            id = auth_user_id
    );
END
$$;
