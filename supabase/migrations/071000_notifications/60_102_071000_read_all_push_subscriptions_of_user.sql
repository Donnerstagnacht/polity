-- TODO: replace public to hidden
DROP FUNCTION IF EXISTS hidden.read_push_subscriptions_of_user(
    _user_to_be_notified uuid
);
CREATE OR REPLACE FUNCTION hidden.read_push_subscriptions_of_user(
    _user_to_be_notified uuid
)
    RETURNS table
            (
                id             uuid,
                endpoint       text,
                expirationtime text,
                auth           text,
                p256dh         text
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY (
        SELECT *
        FROM
            hidden.push_subscriptions
        WHERE
            id = _user_to_be_notified
    );

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No push notifications found for user id %', _user_to_be_notified
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
