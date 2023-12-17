DROP FUNCTION IF EXISTS public.select_unread_notifications_counter();
CREATE OR REPLACE FUNCTION public.select_unread_notifications_counter()
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
    authenticated_user uuid;
BEGIN
    authenticated_user := auth.uid();
    RETURN QUERY (
        SELECT
            authenticated_access.profiles_counters.id AS profile_id,
            authenticated_access.profiles_counters.unread_notifications_counter
        FROM
            authenticated_access.profiles_counters
        WHERE
            id = authenticated_user
    );
END
$$;
