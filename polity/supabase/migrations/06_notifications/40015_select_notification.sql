DROP FUNCTION IF EXISTS hidden_functions.select_notifications_of_users(user_id uuid);
CREATE OR REPLACE FUNCTION hidden_functions.select_notifications_of_users(user_id uuid)
    RETURNS table
            (
                id               uuid,
                sender           uuid,
                receiver         uuid,
                title            text,
                description      text,
                read_by_receiver boolean,
                created_at       timestamp WITH TIME ZONE
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY (
        SELECT *
        FROM
            public.notifications_by_user
        WHERE
            receiver = user_id
    );
END
$$;
