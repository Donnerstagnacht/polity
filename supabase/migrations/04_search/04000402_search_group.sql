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
            authenticated_access.groups.id,
            authenticated_access.groups.name,
            authenticated_access.groups.level,
            authenticated_access.groups.description
        FROM
            authenticated_access.groups
        WHERE
            fts @@ TO_TSQUERY('german', search_term);
END
$$;
