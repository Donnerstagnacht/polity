DROP FUNCTION IF EXISTS authenticated_access.delete_group_member(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.delete_group_member(
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
        group_members
    WHERE
        id = membership_id;
END;
$$;
