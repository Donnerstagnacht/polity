DROP FUNCTION IF EXISTS public.select_notifications_of_users(user_id uuid);
CREATE OR REPLACE FUNCTION public.select_notifications_of_users(user_id uuid)
	RETURNS table
	        (
		        id                   uuid,
		        sender               uuid,
		        receiver             uuid,
		        type_of_notification notifications_enum,
		        read_by_receiver     boolean,
		        created_at           timestamp WITH TIME ZONE
	        )
	LANGUAGE plpgsql
	SECURITY INVOKER
AS
$$
BEGIN
	RETURN QUERY (
		SELECT *
		FROM
			public.notifications_by_user
		WHERE
			receiver = user_id
	);
END
$$;
