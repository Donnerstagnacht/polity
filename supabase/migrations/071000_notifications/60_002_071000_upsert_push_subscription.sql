DROP FUNCTION IF EXISTS authenticated.upsert_push_subscription(
    _endpoint text,
    _expirationTime text,
    _auth text,
    _p256dh text
);
CREATE OR REPLACE FUNCTION authenticated.upsert_push_subscription(
    _endpoint text,
    _expirationTime text,
    _auth text,
    _p256dh text
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id := auth.uid();
    -- TODO: is this gonna work? I think I have to create a composite key from id and endpoint because a user can
    --  subscribe in multiple browsers. How is the endpont string looking from different brwosers? Probably a
    --  composite key or a simple new row for each subscription?
    INSERT INTO
        hidden.push_subscriptions (id,
                                   endpoint,
                                   expirationtime,
                                   auth,
                                   p256dh)
    VALUES
        (auth_user_id,
         _endpoint,
         _expirationTime,
         _auth,
         _p256dh)
    ON CONFLICT (id)
        DO UPDATE SET
                      endpoint       = excluded.endpoint,
                      expirationtime = excluded.expirationtime,
                      auth           = excluded.auth,
                      p256dh         = excluded.p256dh;
END
$$;
