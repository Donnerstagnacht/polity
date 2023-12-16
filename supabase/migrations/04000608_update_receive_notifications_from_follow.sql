DROP FUNCTION IF EXISTS public.update_receive_notifications_from_follow(
    new_status boolean
);
CREATE OR REPLACE FUNCTION public.update_receive_notifications_from_follow(
    new_status boolean
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    authenticated_user uuid;
BEGIN
    authenticated_user := auth.uid();
    UPDATE public.profiles
    SET
        receive_follow_notifications = new_status
    WHERE
        id = authenticated_user;
END
$$;
