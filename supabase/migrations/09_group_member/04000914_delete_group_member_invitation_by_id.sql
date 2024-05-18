DROP FUNCTION IF EXISTS public.delete_group_member_invitation_by_id(
    invitation_id uuid);

CREATE OR REPLACE FUNCTION public.delete_group_member_invitation_by_id(
    invitation_id uuid
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
        authenticated_access.group_invited_members
    WHERE
        authenticated_access.group_invited_members.id = invitation_id
    RETURNING
        authenticated_access.group_invited_members.id,
        authenticated_access.group_invited_members.group_id,
        authenticated_access.group_invited_members.member_id
        INTO
            membership.id,
            membership.group_id,
            membership.member_id;
    RETURN membership;
END;
$$;
