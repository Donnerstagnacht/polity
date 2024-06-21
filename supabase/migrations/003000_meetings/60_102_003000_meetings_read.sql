DROP FUNCTION IF EXISTS hidden.meetings_read(
    _group_id uuid
);

CREATE OR REPLACE FUNCTION hidden.meetings_read(
    _group_id uuid
)
    RETURNS table
            (
                id          uuid,
                group_id    uuid,
                creator_id  uuid,
                name        text,
                description text,
                type        hidden.meeting_type,
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
            hidden.meetings
        WHERE
            group_id = _group_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No meetings found for group id %', _group_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
