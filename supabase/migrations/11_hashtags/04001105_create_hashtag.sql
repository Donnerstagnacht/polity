DROP FUNCTION IF EXISTS authenticated_access.create_hashtag(
    value text
);

CREATE OR REPLACE FUNCTION authenticated_access.create_hashtag(
    value text
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    INSERT INTO
        authenticated_access.hashtags(value)
    VALUES (value);
END;
$$
