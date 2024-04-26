DROP FUNCTION IF EXISTS authenticated_access.delete_group_hashtag_relationship(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.delete_group_hashtag_relationshi(
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
        authenticated_access.group_hashtags
    WHERE
        hashtag_id = hashtag_id;
END;
$$;
