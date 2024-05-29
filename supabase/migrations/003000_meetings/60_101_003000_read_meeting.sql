DROP FUNCTION IF EXISTS hidden.read_meeting(
    meeting_id uuid
);

CREATE OR REPLACE FUNCTION hidden.read_meeting(
    _meeting_id uuid
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
            hidden.meetings
        WHERE
            id = _meeting_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No meeting found for id %', _meeting_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
