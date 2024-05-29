DROP FUNCTION IF EXISTS hidden.create_hashtag(
    value text
);

CREATE OR REPLACE FUNCTION hidden.create_hashtag(
    value text
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    INSERT INTO
        hidden.hashtags(value)
    VALUES (value);
END;
$$
