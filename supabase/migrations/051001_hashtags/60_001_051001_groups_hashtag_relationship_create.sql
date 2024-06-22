DROP FUNCTION IF EXISTS hidden.groups_hashtag_relationship_create(
    _group_id uuid,
    _hashtag_id uuid
);

CREATE OR REPLACE FUNCTION hidden.groups_hashtag_relationship_create(
    _group_id uuid,
    _hashtag_id uuid
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
        (_group_id,
         _hashtag_id);
END;
$$
