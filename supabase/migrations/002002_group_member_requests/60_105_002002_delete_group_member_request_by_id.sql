DROP FUNCTION IF EXISTS authenticated.delete_group_member_request_by_id(
    _request_id uuid
);

CREATE OR REPLACE FUNCTION authenticated.delete_group_member_request_by_id(
    _request_id uuid
)
    RETURNS membership
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    membership membership;
BEGIN
    DELETE
    FROM
        hidden.group_member_requests
    WHERE
        id = _request_id
    RETURNING
        id,
        group_id,
        member_id
        INTO
            membership.id,
            membership.group_id,
            membership.member_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member request found for request id %', _request_id
            USING ERRCODE = 'P0002';
    END IF;
    RETURN membership;
END;
$$;
