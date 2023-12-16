DROP FUNCTION IF EXISTS public.search_user(
    search_term text
);
CREATE OR REPLACE FUNCTION public.search_user(
    search_term text
)
    RETURNS table
            (
                id         uuid,
                first_name text,
                last_name  text,
                username   text
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
            authenticated_access.profiles.username
        FROM
            authenticated_access.profiles
        WHERE
            fts @@ TO_TSQUERY('german', search_term);
END
$$;
