DROP FUNCTION IF EXISTS hidden.create_notification_from_user_transaction(
    _sender uuid,
    _receiver uuid,
    _type_of_notification hidden.notifications_enum,
    _read_by_receiver boolean
);
CREATE OR REPLACE FUNCTION hidden.create_notification_from_user_transaction(
    _sender uuid,
    _receiver uuid,
    _type_of_notification hidden.notifications_enum,
    _read_by_receiver boolean
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
DECLARE
    is_notification_enabled boolean;
BEGIN
    is_notification_enabled := hidden.check_profile_if_user_receives_follow_notifications(
        _receiver
                               );

    IF is_notification_enabled THEN
        PERFORM hidden.create_notification_by_user(
            _sender,
            _receiver,
            _type_of_notification,
            _read_by_receiver
                );
        PERFORM hidden.increment_profile_notification_counter(
            _receiver
                );
    END IF;
END;
$$;
