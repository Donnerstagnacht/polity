DROP FUNCTION IF EXISTS authenticated_access.read_group_member_invitations(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.read_group_member_invitations(
    group_id uuid
)
    RETURNS table
            (
                id          uuid,
                group_id_in uuid,
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
            authenticated_access.group_id = group_id_in;
END;
$$;