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
