DROP FUNCTION IF EXISTS authenticated.group_member_invitations_by_id_delete(
    _invitation_id uuid);

CREATE OR REPLACE FUNCTION authenticated.group_member_invitations_by_id_delete(
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

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member invitation found for invitation id %', _invitation_id
            USING ERRCODE = 'P0002';
    END IF;
    RETURN membership;
END;
$$;
