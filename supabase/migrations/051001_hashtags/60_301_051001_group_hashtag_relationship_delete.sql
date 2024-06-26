DROP FUNCTION IF EXISTS hidden.group_hashtag_relationship_delete(
    _hashtag_id uuid);

CREATE OR REPLACE FUNCTION hidden.group_hashtag_relationship_delete(
    _hashtag_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    DELETE
    FROM
        hidden.group_hashtags
    WHERE
        _hashtag_id = _hashtag_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No hashtag found for id %', _hashtag_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
