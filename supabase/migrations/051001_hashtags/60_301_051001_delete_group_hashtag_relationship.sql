DROP FUNCTION IF EXISTS hidden.delete_group_hashtag_relationship(uuid);

CREATE OR REPLACE FUNCTION hidden.delete_group_hashtag_relationshi(
    hashtag_id uuid
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
        hashtag_id = hashtag_id;
END;
$$;
