-- TODO: replace public to hidden
DROP FUNCTION IF EXISTS public.read_all_push_subscriptions_of_user(
    user_to_be_notified uuid
);
CREATE OR REPLACE FUNCTION public.read_all_push_subscriptions_of_user(
    user_to_be_notified uuid
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
            push_subscriptions.id = user_to_be_notified
    );
END
$$;
