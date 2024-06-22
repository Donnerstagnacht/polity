DROP FUNCTION IF EXISTS authenticated.notifications_of_user_read();
CREATE OR REPLACE FUNCTION authenticated.notifications_of_user_read()
    RETURNS table
            (
                id_                   uuid,
                type_of_notification_ hidden.notifications_enum,
                read_by_receiver_     boolean,
                created_at_           timestamp WITH TIME ZONE,
                profile_id_           uuid,
                first_name_           text,
                last_name_            text,
                profile_image_        text
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
            hidden.notifications_by_user.id,
            hidden.notifications_by_user.type_of_notification,
            hidden.notifications_by_user.read_by_receiver,
            hidden.notifications_by_user.created_at,
            profiles.id,
            profiles.first_name,
            profiles.last_name,
            profiles.profile_image
        FROM
            hidden.notifications_by_user
            JOIN hidden.profiles
            ON hidden.profiles.id = hidden.notifications_by_user.sender

        WHERE
            receiver = auth_user_id
        ORDER BY notifications_by_user.created_at DESC
    );

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No notifications found for user id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;

--option with retrun query instead of setof
-- DROP FUNCTION IF EXISTS authenticated.notifications_of_user_reads(
--     user_id uuid
-- );
-- CREATE OR REPLACE FUNCTION authenticated.notifications_of_user_reads(
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
--             authenticated.notifications_by_user
--         WHERE
--                 receiver = user_id
--     );
-- END
-- $$;
