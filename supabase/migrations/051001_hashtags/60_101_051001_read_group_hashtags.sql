DROP FUNCTION IF EXISTS hidden.read_group_hashtags(uuid);

CREATE OR REPLACE FUNCTION hidden.read_group_hashtags(
    group_id_in uuid
)
    RETURNS table
            (
                id    uuid,
                value uuid
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
            group_id = group_id_in;
END;
$$;
