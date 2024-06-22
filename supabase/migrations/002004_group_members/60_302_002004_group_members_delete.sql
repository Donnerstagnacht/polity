DROP FUNCTION IF EXISTS hidden.group_member_delete(
    _user_id uuid,
    _group_id uuid
);

CREATE OR REPLACE FUNCTION hidden.group_member_delete(
    _user_id uuid,
    _group_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    DELETE
    FROM
        hidden.group_members
    WHERE
          member_id = _user_id
      AND group_id = _group_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member found for group id % and user id %', _group_id, _user_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
