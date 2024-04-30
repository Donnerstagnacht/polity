DROP FUNCTION IF EXISTS public.read_group_implied_type(uuid);
CREATE OR REPLACE FUNCTION public.read_group_implied_type(group_id uuid)
    RETURNS authenticated_access.groups
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    group_record authenticated_access.groups;
BEGIN
    SELECT *
    INTO group_record
    FROM
        authenticated_access.groups
    WHERE
        authenticated_access.groups.id = group_id;
    RETURN group_record;
END
$$;
