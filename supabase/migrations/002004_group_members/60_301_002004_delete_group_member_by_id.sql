DROP FUNCTION IF EXISTS hidden.delete_group_member_by_id(uuid);

CREATE OR REPLACE FUNCTION hidden.delete_group_member_by_id(
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
        hidden.group_members
    WHERE
        id = membership_id
    RETURNING
        hidden.group_members.id,
        hidden.group_members.group_id,
        hidden.group_members.member_id
        INTO
            membership.id,
            membership.group_id,
            membership.member_id;
    RETURN membership;
END;
$$;
