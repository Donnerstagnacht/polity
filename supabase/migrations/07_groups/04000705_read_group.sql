DROP FUNCTION IF EXISTS public.read_group_record(uuid);
CREATE OR REPLACE FUNCTION public.read_group_record(group_id uuid)
    RETURNS record
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    group_record record;
BEGIN
    SELECT *
    INTO group_record
    FROM
        authenticated_access.groups
    WHERE
        authenticated_access.groups.id = group_id;

    IF FOUND THEN
        RETURN group_record;
    END IF;
END
$$;
