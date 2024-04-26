DROP FUNCTION IF EXISTS authenticated_access.delete_group_member_invitation(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.delete_group_member_invitation(
    invitation_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
AS
$$
BEGIN
    DELETE
    FROM
        group_member_invitations
    WHERE
        id = invitation_id;
END;
$$;
