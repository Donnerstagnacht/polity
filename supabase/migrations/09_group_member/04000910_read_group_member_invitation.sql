DROP FUNCTION IF EXISTS authenticated_access.read_group_member_invitation(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.read_group_member_invitation(
    group_member_invitation_id uuid
)
    RETURNS table
            (
                id          uuid,
                group_id    uuid,
                member_id   uuid,
                member_type group_member,
                created_at  timestamp WITH TIME ZONE,
                updated_at  timestamp WITH TIME ZONE
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT *
        FROM
            group_member_invitations
        WHERE
            id = group_member_invitation_id;
END;
$$;
