DROP FUNCTION IF EXISTS public.delete_group_member_invitation_by_id(
    _invitation_id uuid);

CREATE OR REPLACE FUNCTION public.delete_group_member_invitation_by_id(
    _invitation_id uuid
)
    RETURNS membership
    LANGUAGE plpgsql
AS
$$
DECLARE
    membership membership;
BEGIN
    DELETE
    FROM
        hidden.group_invited_members
    WHERE
        id = _invitation_id
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
