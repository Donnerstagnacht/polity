DROP FUNCTION IF EXISTS public.read_unread_notifications_counter();
CREATE OR REPLACE FUNCTION public.read_unread_notifications_counter()
    RETURNS table
            (
                profile_id_                   uuid,
                unread_notifications_counter_ bigint
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

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No profile found for user with id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
