DROP FUNCTION IF EXISTS authenticated.group_member_invitations_delete_by_inviter(
    _group_id uuid,
    _member_id uuid
);

CREATE OR REPLACE FUNCTION authenticated.group_member_invitations_delete_by_inviter(
    _group_id uuid,
    _member_id uuid
)
    RETURNS table
            (
                id_         uuid,
                group_id_   uuid,
                member_id_  uuid,
                invited_by_ uuid
            )
    LANGUAGE plpgsql
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id = auth.uid();
    RETURN QUERY
        DELETE
            FROM
                hidden.group_invited_members
                WHERE
                    group_id = _group_id
                        AND member_id = _member_id
                        AND invited_by = auth_user_id
                RETURNING
                    id,
                    group_id,
                    member_id,
                    invited_by;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member invitation found for group id %', _group_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
