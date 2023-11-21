DROP FUNCTION IF EXISTS public.select_notifications_of_users(
    user_id uuid
);
CREATE OR REPLACE FUNCTION public.select_notifications_of_users(
    user_id uuid
)
    RETURNS table (
	    type_of_notification notifications_enum,
	    read_by_receiver     boolean,
	    created_at           timestamp WITH TIME ZONE
	    first_name           text,
	    last_name            text,
	    profile_image        text
    )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY (
        SELECT
	        notifications_by_user.type_of_notification,
	        notifications_by_user.read_by_receiver,
	        notifications_by_user.created_at,
	        profiles.first_name,
	        profiles.last_name,
	        profiles.profile_image
        FROM
            public.notifications_by_user
        JOIN public.profiles
		On public.profiles.id = public.notifications_by_user.sender

        WHERE
            receiver = user_id
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
