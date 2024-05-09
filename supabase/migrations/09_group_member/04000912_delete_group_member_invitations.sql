DROP FUNCTION IF EXISTS public.delete_group_member_invitation(
    invitation_id uuid);

CREATE OR REPLACE FUNCTION public.delete_group_member_invitation(
    invitation_id uuid
)
    RETURNS table
            (
                group_id  uuid,
                member_id uuid
            )
    LANGUAGE plpgsql
AS
$$
BEGIN
    DELETE
    FROM
        authenticated_access.group_invited_members
    WHERE
        id = invitation_id
    RETURNING
        group_id,
        member_id
        INTO
            group_id,
            member_id;
END;
$$;
