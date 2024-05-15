DROP FUNCTION IF EXISTS authenticated_access.delete_group_member_by_id(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.delete_group_member_by_id(
    membership_id uuid
)
    RETURNS membership
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    membership membership;
BEGIN
    DELETE
    FROM
        authenticated_access.group_members
    WHERE
        id = membership_id
    RETURNING
        authenticated_access.group_members.id,
        authenticated_access.group_members.group_id,
        authenticated_access.group_members.member_id
        INTO
            membership.id,
            membership.group_id,
            membership.member_id;
    RETURN membership;
END;
$$;
