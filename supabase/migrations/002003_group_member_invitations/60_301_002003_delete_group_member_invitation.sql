DROP FUNCTION IF EXISTS authenticated.delete_group_member_invitation(
    _group_id uuid);

CREATE OR REPLACE FUNCTION authenticated.delete_group_member_invitation(
    _group_id uuid
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
        hidden.group_invited_members
    WHERE
          group_id = _group_id
      AND member_id = auth_user_id
    RETURNING
        id,
        group_id,
        member_id
        INTO
            membership.id,
            membership.group_id,
            membership.member_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member invitation found for group id %', _group_id
            USING ERRCODE = 'P0002';
    END IF;
    RETURN membership;
END;
$$;
