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
            hidden.profiles.id,
            hidden.profiles.first_name,
            hidden.profiles.last_name,
            hidden.profiles.username
        FROM
            hidden.profiles
        WHERE
            fts @@ TO_TSQUERY('german', search_term);
END
$$;
