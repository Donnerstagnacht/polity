DROP FUNCTION IF EXISTS public.select_unread_notifications_counter(
    user_id uuid
);
CREATE OR REPLACE FUNCTION public.select_unread_notifications_counter(
    user_id uuid
)
    RETURNS table
            (
                profile_id                   uuid,
                unread_notifications_counter bigint
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY (
        SELECT
            public.profiles_counters.id AS profile_id,
            public.profiles_counters.unread_notifications_counter
        FROM
            public.profiles_counters
        WHERE
            id = user_id
    );
END
$$;
