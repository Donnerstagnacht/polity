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
    authenticated_user uuid;
BEGIN
    authenticated_user := auth.uid();
    RETURN QUERY (
        SELECT
            hidden.profiles_counters.id AS profile_id,
            hidden.profiles_counters.unread_notifications_counter
        FROM
            hidden.profiles_counters
        WHERE
            id = authenticated_user
    );
END
$$;
