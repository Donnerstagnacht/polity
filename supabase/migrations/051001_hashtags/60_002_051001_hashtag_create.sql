DROP FUNCTION IF EXISTS hidden.hashtag_create(
    _value text
);

CREATE OR REPLACE FUNCTION hidden.hashtag_create(
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
