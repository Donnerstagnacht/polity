DROP FUNCTION IF EXISTS authenticated_access.read_group_member_requests(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.read_group_member_requests(
    group_id_in uuid
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
            authenticated_access.group_member_requests
        WHERE
            authenticated_access.group_id = group_id_in;
END;
$$;
