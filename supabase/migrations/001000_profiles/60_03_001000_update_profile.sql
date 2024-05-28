DROP FUNCTION IF EXISTS public.update_profile(
    updated_at_in timestamp WITH TIME ZONE,
    username_in text,
    first_name_in text,
    last_name_in text,
    profile_image_in text,
    receive_follow_notifications_in boolean
);
CREATE OR REPLACE FUNCTION public.update_profile(
    updated_at_in timestamp WITH TIME ZONE DEFAULT NULL,
    username_in text DEFAULT NULL,
    first_name_in text DEFAULT NULL,
    last_name_in text DEFAULT NULL,
    profile_image_in text DEFAULT NULL,
    receive_follow_notifications_in boolean DEFAULT NULL
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
    UPDATE authenticated_access.profiles
    SET
        username                     = COALESCE(username_in, username),
        first_name                   = COALESCE(first_name_in, first_name),
        last_name                    = COALESCE(last_name_in, last_name),
        profile_image                = COALESCE(profile_image_in, profile_image),
        receive_follow_notifications = COALESCE(receive_follow_notifications_in, receive_follow_notifications)
    WHERE
        id = authenticated_user;
END
$$;
