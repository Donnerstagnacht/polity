DROP FUNCTION IF EXISTS public.delete_group_member_invitation(
    group_id_in uuid);

CREATE OR REPLACE FUNCTION public.delete_group_member_invitation(
    group_id_in uuid
)
    RETURNS membership
    LANGUAGE plpgsql
AS
$$
DECLARE
    auth_user_id uuid;
    membership   membership;
BEGIN
    auth_user_id = auth.uid();
    DELETE
    FROM
        authenticated_access.group_invited_members
    WHERE
          authenticated_access.group_invited_members.group_id = group_id_in
      AND authenticated_access.group_invited_members.member_id = auth_user_id
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
