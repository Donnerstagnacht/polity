DROP FUNCTION IF EXISTS public.delete_group_member_by_id(uuid);

CREATE OR REPLACE FUNCTION public.delete_group_member_by_id(
    membership_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    DELETE
    FROM
        authenticated_access.group_members
    WHERE
        id = membership_id;
END;
$$;
