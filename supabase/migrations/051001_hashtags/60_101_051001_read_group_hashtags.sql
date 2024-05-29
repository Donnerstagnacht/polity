DROP FUNCTION IF EXISTS hidden.read_group_hashtags(
    _group_id uuid);

CREATE OR REPLACE FUNCTION hidden.read_group_hashtags(
    _group_id uuid
)
    RETURNS table
            (
                id_    uuid,
                value_ uuid
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT
            hashtags.id,
            hashtags.value
        FROM
            hidden.group_hashtags
            JOIN
                hidden.hashtags
            ON
                group_hashtags.hashtag_id = hashtags.id
        WHERE
            group_id = _group_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No hashtags found for group id %', _group_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
