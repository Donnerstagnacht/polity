DROP FUNCTION IF EXISTS authenticated_access.read_group_member_invitation(
    group_id_in uuid,
    user_id_in uuid
);

CREATE OR REPLACE FUNCTION authenticated_access.read_group_member_invitation(
    group_id_in uuid,
    user_id_in uuid
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
            authenticated_access.group_invited_members
        WHERE
              authenticated_access.group_invited_members.group_id = group_id_in
          AND authenticated_access.group_invited_members.member_id = user_id_in;
END;
$$;
