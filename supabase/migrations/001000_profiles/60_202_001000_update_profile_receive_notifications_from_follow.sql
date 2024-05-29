DROP FUNCTION IF EXISTS public.update_profile_receive_notifications_from_follow(
    _new_status boolean
);
CREATE OR REPLACE FUNCTION public.update_profile_receive_notifications_from_follow(
    _new_status boolean
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id := auth.uid();
    UPDATE hidden.profiles
    SET
        receive_follow_notifications = _new_status
    WHERE
        id = auth_user_id;
END
$$;
