DROP FUNCTION IF EXISTS public.search_group(
    search_term text
);
CREATE OR REPLACE FUNCTION public.search_group(
    search_term text
)
    RETURNS table
            (
                id          uuid,
                name        text,
                level       group_level,
                description text
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT
            hidden.groups.id,
            hidden.groups.name,
            hidden.groups.level,
            hidden.groups.description
        FROM
            hidden.groups
        WHERE
            fts @@ TO_TSQUERY('german', search_term);
END
$$;
