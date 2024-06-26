DROP FUNCTION IF EXISTS hidden.meetings_read_one(
    meeting_id uuid
);

CREATE OR REPLACE FUNCTION hidden.meetings_read_one(
    _meeting_id uuid
)
    RETURNS table
            (
                id_          uuid,
                group_id_    uuid,
                creator_id_  uuid,
                name_        text,
                description_ text,
                type_        hidden.meeting_type,
                date_        timestamp WITH TIME ZONE,
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
            hidden.meetings
        WHERE
            id = _meeting_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No meeting found for id %', _meeting_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
