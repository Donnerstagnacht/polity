DROP FUNCTION IF EXISTS public.read_user(
    user_id uuid
);
CREATE OR REPLACE FUNCTION public.read_user(
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
            hidden.profiles.id,
            hidden.profiles.first_name,
            hidden.profiles.last_name,
            hidden.profiles.profile_image
        FROM
            hidden.profiles
        WHERE
            hidden.profiles.id = user_id;
END
$$;
