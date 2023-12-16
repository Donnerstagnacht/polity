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
            public.profiles.id,
            public.profiles.first_name,
            public.profiles.last_name,
            public.profiles.username
        FROM
            public.profiles
        WHERE
            fts @@ TO_TSQUERY('german', search_term);
END
$$;
