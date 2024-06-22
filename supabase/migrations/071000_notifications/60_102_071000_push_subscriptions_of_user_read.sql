-- TODO: replace authenticated to hidden
DROP FUNCTION IF EXISTS hidden.push_subscriptions_of_user_read(
    _user_to_be_notified uuid
);
CREATE OR REPLACE FUNCTION hidden.push_subscriptions_of_user_read(
    _user_to_be_notified uuid
)
    RETURNS table
            (
                id_             uuid,
                endpoint_       text,
                expirationtime_ text,
                auth_           text,
                p256dh_         text
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
