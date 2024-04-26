DROP FUNCTION IF EXISTS authenticated_access.read_group_hashtags(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.read_group_hashtags(
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
            authenticated_access.group_hashtags
            JOIN
                authenticated_access.hashtags
            ON
                group_hashtags.hashtag_id = hashtags.id
        WHERE
            group_id = group_id_in;
END;
$$;
