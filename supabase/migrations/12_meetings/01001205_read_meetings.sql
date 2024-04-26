DROP FUNCTION IF EXISTS authenticated_access.read_meetings(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.read_meetings(
    group_id_in uuid
)
    RETURNS table
            (
                id          uuid,
                group_id    uuid,
                creator_id  uuid,
                name        text,
                description text,
                type        meeting_type,
                date        timestamp WITH TIME ZONE,
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
            authenticated_access.meetings
        WHERE
            authenticated_access.group_id = group_id_in;
END;
$$;
