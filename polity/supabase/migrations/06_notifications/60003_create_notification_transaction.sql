DROP FUNCTION IF EXISTS public.create_notification_from_user_transaction(
    sender uuid,
    receiver uuid,
    type_of_notification text,
    read_by_receiver boolean
);
CREATE OR REPLACE FUNCTION public.create_notification_from_user_transaction(
    sender uuid,
    receiver uuid,
    type_of_notification text,
    read_by_receiver boolean
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
DECLARE
    is_notification_enabled boolean;
BEGIN
    is_notification_enabled := hidden_functions.check_if_user_receives_follow_notifications(
        receiver
        );

    IF is_notification_enabled THEN
        PERFORM hidden_functions.insert_notification_by_user(
            sender,
            receiver,
            type_of_notification,
            read_by_receiver
            );
        PERFORM hidden_functions.increment_notification_counter(
            receiver
            );
    END IF;
END;
$$;
