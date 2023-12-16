DROP FUNCTION IF EXISTS public.select_notifications_of_users();
CREATE OR REPLACE FUNCTION public.select_notifications_of_users()
    RETURNS table
            (
                type_of_notification notifications_enum,
                read_by_receiver     boolean,
                created_at           timestamp WITH TIME ZONE,
                first_name           text,
                last_name            text,
                profile_image        text
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
            authenticated_access.notifications_by_user.type_of_notification,
            authenticated_access.notifications_by_user.read_by_receiver,
            authenticated_access.notifications_by_user.created_at,
            profiles.first_name,
            profiles.last_name,
            profiles.profile_image
        FROM
            authenticated_access.notifications_by_user
            JOIN authenticated_access.profiles
            ON authenticated_access.profiles.id = authenticated_access.notifications_by_user.sender

        WHERE
            receiver = authenticated_user
        ORDER BY notifications_by_user.created_at DESC
    );
END
$$;

--option with retrun query instead of setof
-- DROP FUNCTION IF EXISTS public.select_notifications_of_users(
--     user_id uuid
-- );
-- CREATE OR REPLACE FUNCTION public.select_notifications_of_users(
--     user_id uuid
-- )
--     RETURNS table
--             (
--                 id                   uuid,
--                 sender               uuid,
--                 receiver_out         uuid,
--                 type_of_notification notifications_enum,
--                 read_by_receiver     boolean,
--                 created_at           timestamp WITH TIME ZONE
--             )
--     LANGUAGE plpgsql
--     SECURITY INVOKER
-- AS
-- $$
-- BEGIN
--     RETURN QUERY (
--         SELECT *
--         FROM
--             public.notifications_by_user
--         WHERE
--                 receiver = user_id
--     );
-- END
-- $$;
