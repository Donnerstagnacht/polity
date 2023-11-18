DROP FUNCTION IF EXISTS public.select_follower_of_user(
	following_id uuid
);
CREATE OR REPLACE FUNCTION public.select_follower_of_user(
	following_id uuid
)
	RETURNS table
	        (
		        id         uuid,
		        first_name text,
		        last_name  text
	        )
	LANGUAGE plpgsql
	SECURITY INVOKER
AS
$$
BEGIN
	RETURN QUERY (
		SELECT
			profiles.id,
			profiles.first_name,
			profiles.last_name
		FROM
			public.following_profiles
			JOIN public.profiles
			ON following_profiles.follower = profiles.id
		WHERE
			following_profiles.following = following_id
	);
END
$$;

DROP FUNCTION IF EXISTS public.select_following_of_user(
	follower_id uuid
);
CREATE OR REPLACE FUNCTION public.select_following_of_user(
	follower_id uuid
)
	RETURNS table
	        (
		        id         uuid,
		        first_name text,
		        last_name  text
	        )
	LANGUAGE plpgsql
	SECURITY INVOKER
AS
$$
BEGIN
	RETURN QUERY
		(
			SELECT
				profiles.id,
				profiles.first_name,
				profiles.last_name
			FROM
				following_profiles
				JOIN profiles
				ON following_profiles.following = profiles.id
			WHERE
				following_profiles.follower = follower_id
		);
END
$$;
