DROP FUNCTION IF EXISTS public.read_profile(
    _user_id uuid
);
CREATE OR REPLACE FUNCTION public.read_profile(
    _user_id uuid
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
            id,
            first_name,
            last_name,
            profile_image
        FROM
            hidden.profiles
        WHERE
            id = _user_id;
END
$$;
