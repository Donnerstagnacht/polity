DROP FUNCTION IF EXISTS authenticated_access.create_group_hashtag_relationship(
    uuid,
    uuid
);

CREATE OR REPLACE FUNCTION authenticated_access.create_group_hashtag_relationship(
    group_id uuid,
    hashtag_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    INSERT INTO
        authenticated_access.group_hashtags(group_id,
                                            hashtag_id)
    VALUES
        (group_id,
         hashtag_id);
END;
$$
