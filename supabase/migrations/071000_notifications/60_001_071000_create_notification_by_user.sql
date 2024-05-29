DROP FUNCTION IF EXISTS hidden.create_notification_by_user(
    _sender uuid,
    _receiver uuid,
    _type_of_notification hidden.notifications_enum,
    _read_by_receiver boolean
);
CREATE OR REPLACE FUNCTION hidden.create_notification_by_user(
    _sender uuid,
    _receiver uuid,
    _type_of_notification hidden.notifications_enum,
    _read_by_receiver boolean
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
        (_sender,
         _receiver,
         _type_of_notification,
         _read_by_receiver);
END;
$$;
