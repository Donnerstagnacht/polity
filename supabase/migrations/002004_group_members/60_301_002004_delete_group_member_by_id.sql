DROP FUNCTION IF EXISTS hidden.delete_group_member_by_id(
    _membership_id uuid
);

CREATE OR REPLACE FUNCTION hidden.delete_group_member_by_id(
    _membership_id uuid
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
        id = _membership_id
    RETURNING
        id,
        group_id,
        member_id
        INTO
            membership.id,
            membership.group_id,
            membership.member_id;
    RETURN membership;
END;
$$;
