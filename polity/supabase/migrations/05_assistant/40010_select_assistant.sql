DROP FUNCTION IF EXISTS public.select_assistant(user_id uuid);
CREATE OR REPLACE FUNCTION public.select_assistant(user_id uuid)
	RETURNS table
	        (
		        profile_id    uuid,
		        first_sign_in boolean,
		        skip_tutorial boolean,
		        last_tutorial tutorial_enum
	        )
	LANGUAGE plpgsql
	SECURITY INVOKER
AS
$$
BEGIN
	RETURN QUERY (
		SELECT *
		FROM
			public.assistants
		WHERE
			id = user_id
	);
END
$$;