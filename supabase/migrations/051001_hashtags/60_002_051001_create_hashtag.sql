DROP FUNCTION IF EXISTS hidden.create_hashtag(
    _value text
);

CREATE OR REPLACE FUNCTION hidden.create_hashtag(
    _value text
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    INSERT INTO
        hidden.hashtags(value)
    VALUES (_value);
END;
$$
