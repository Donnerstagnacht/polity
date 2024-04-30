DROP FUNCTION IF EXISTS public.read_group_columns(uuid);
CREATE OR REPLACE FUNCTION public.read_group_columns(group_id uuid)
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
            authenticated_access.groups.id = group_id;
END
$$;
