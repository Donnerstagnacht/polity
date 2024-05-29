DROP FUNCTION IF EXISTS hidden.read_group_member_request(
    _group_id uuid,
    _user_id uuid
);

CREATE OR REPLACE FUNCTION hidden.read_group_member_request(
    _group_id uuid,
    _user_id uuid
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
            hidden.group_member_requests
        WHERE
              group_id = _group_id
          AND member_id = _user_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member request found for group id % and user id %', _group_id, _user_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
