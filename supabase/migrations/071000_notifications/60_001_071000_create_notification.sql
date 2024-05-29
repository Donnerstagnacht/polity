DROP FUNCTION IF EXISTS hidden.create_notification_by_user(
    sender uuid,
    receiver uuid,
    type_of_notification notifications_enum,
    read_by_receiver boolean
);
CREATE OR REPLACE FUNCTION hidden.create_notification_by_user(
    sender uuid,
    receiver uuid,
    type_of_notification notifications_enum,
    read_by_receiver boolean
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    INSERT INTO
        hidden.notifications_by_user (sender,
                                      receiver,
                                      type_of_notification,
                                      read_by_receiver)
    VALUES
        (sender,
         receiver,
         type_of_notification,
         read_by_receiver);
END;
$$;
