DROP FUNCTION IF EXISTS authenticated_access.read_group_member_request(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.read_group_member_request(
    group_member_request_id uuid
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
            authenticated_access.group_member_request
        WHERE
            id = group_member_request_id;
END;
$$;
