DROP FUNCTION IF EXISTS public.select_user(
    user_id uuid
);
CREATE OR REPLACE FUNCTION public.select_user(
    user_id uuid
)
    RETURNS table
            (
                id            uuid,
                first_name    text,
                last_name     text,
                profile_image text
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT
            public.profiles.id,
            public.profiles.first_name,
            public.profiles.last_name,
            public.profiles.profile_image
        FROM
            public.profiles
        WHERE
            public.profiles.id = user_id;
END
$$;
