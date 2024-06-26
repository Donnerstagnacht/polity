DROP FUNCTION IF EXISTS hidden.group_member_invitations_read_one(
    _group_id uuid,
    _user_id uuid
);

CREATE OR REPLACE FUNCTION hidden.group_member_invitations_read_one(
    _group_id uuid,
    _user_id uuid
)
    RETURNS table
            (
                id_          uuid,
                group_id_    uuid,
                member_id_   uuid,
                member_type_ hidden.group_member,
                created_at_  timestamp WITH TIME ZONE,
                updated_at_  timestamp WITH TIME ZONE
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT *
        FROM
            hidden.group_invited_members
        WHERE
              group_id = _group_id
          AND member_id = _user_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member invitation found for group id % and user id %', _group_id, _user_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
