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
            authenticated_access.profiles.id,
            authenticated_access.profiles.first_name,
            authenticated_access.profiles.last_name,
            authenticated_access.profiles.profile_image
        FROM
            authenticated_access.profiles
        WHERE
            authenticated_access.profiles.id = user_id;
END
$$;
