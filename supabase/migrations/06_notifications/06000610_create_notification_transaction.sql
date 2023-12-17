DROP FUNCTION IF EXISTS authenticated_access.create_notification_from_user_transaction(
    sender uuid,
    receiver uuid,
    type_of_notification notifications_enum,
    read_by_receiver boolean
);
CREATE OR REPLACE FUNCTION authenticated_access.create_notification_from_user_transaction(
    sender uuid,
    receiver uuid,
    type_of_notification notifications_enum,
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
    is_notification_enabled := authenticated_access.check_if_user_receives_follow_notifications(
        receiver
                               );

    IF is_notification_enabled THEN
        PERFORM authenticated_access.insert_notification_by_user(
            sender,
            receiver,
            type_of_notification,
            read_by_receiver
                );
        PERFORM authenticated_access.increment_notification_counter(
            receiver
                );
    END IF;
END;
$$;
