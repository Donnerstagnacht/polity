DROP FUNCTION IF EXISTS public.search_group(
    _search_term text
);
CREATE OR REPLACE FUNCTION public.search_group(
    _search_term text
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
            id,
            name,
            level,
            description
        FROM
            hidden.groups
        WHERE
            fts @@ TO_TSQUERY('german', _search_term);
END
$$;
