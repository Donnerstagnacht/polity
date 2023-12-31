-- TODO: replace public to authenticated_access
DROP FUNCTION IF EXISTS public.select_all_push_subscriptions_of_user(
    user_to_be_notified uuid
);
CREATE OR REPLACE FUNCTION public.select_all_push_subscriptions_of_user(
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
            authenticated_access.push_subscriptions

        WHERE
            push_subscriptions.id = user_to_be_notified
    );
END
$$;
