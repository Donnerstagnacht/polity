DROP FUNCTION IF EXISTS public.upsert_push_subscription(
    endpoint text,
    expirationTime text,
    auth text,
    p256dh text
);
CREATE OR REPLACE FUNCTION public.upsert_push_subscription(
    endpoint text,
    expirationTime text,
    auth text,
    p256dh text
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    authenticated_user uuid;
BEGIN
    authenticated_user := auth.uid();
    -- TODO: is this gonna work? I think I have to create a composite key from id and endpoint because a user can
    --  subscribe in multiple browsers. How is the endpont string looking from different brwosers? Probably a
    --  composite key or a simple new row for each subscription?
    INSERT INTO
        authenticated_access.push_subscriptions (id,
                                                 endpoint,
                                                 expirationTime,
                                                 auth,
                                                 p256dh)
    VALUES
        (authenticated_user,
         endpoint,
         expirationTime,
         auth,
         p256dh)
    ON CONFLICT (id)
        DO UPDATE SET
                      endpoint       = excluded.endpoint,
                      expirationTime = excluded.expirationTime,
                      auth           = excluded.auth,
                      p256dh         = excluded.p256dh;
END
$$;
