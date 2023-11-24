DROP FUNCTION IF EXISTS public.update_receive_notifications_from_follow(
    user_id uuid,
    new_status boolean
);
CREATE OR REPLACE FUNCTION public.update_receive_notifications_from_follow(
    user_id uuid,
    new_status boolean
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    UPDATE public.profiles
    SET
        receive_follow_notifications = new_status
    WHERE
        id = user_id;
END
$$;
