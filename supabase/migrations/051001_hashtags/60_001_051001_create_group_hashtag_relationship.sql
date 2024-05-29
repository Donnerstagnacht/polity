DROP FUNCTION IF EXISTS hidden.create_group_hashtag_relationship(
    uuid,
    uuid
);

CREATE OR REPLACE FUNCTION hidden.create_group_hashtag_relationship(
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
        hidden.group_hashtags(group_id,
                              hashtag_id)
    VALUES
        (group_id,
         hashtag_id);
END;
$$
