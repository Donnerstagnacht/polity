DROP FUNCTION IF EXISTS authenticated_access.delete_group_member_request(
    request_id uuid
);

CREATE OR REPLACE FUNCTION authenticated_access.delete_group_member_request(
    request_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    DELETE
    FROM
        authenticated_access.group_member_requests
    WHERE
        id = request_id;
END;
$$;
