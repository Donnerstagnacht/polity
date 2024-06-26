DROP FUNCTION IF EXISTS authenticated.profiles_update(
    _updated_at timestamp WITH TIME ZONE,
    _username text,
    _first_name_in text,
    _last_name text,
    _profile_image text,
    _receive_follow_notifications boolean
);
CREATE OR REPLACE FUNCTION authenticated.profiles_update(
    _username text DEFAULT NULL,
    _first_name text DEFAULT NULL,
    _last_name text DEFAULT NULL,
    _profile_image text DEFAULT NULL,
    _receive_follow_notifications boolean DEFAULT NULL
)
    RETURNS table
            (
                profile_id_    uuid,
                first_name_    text,
                last_name_     text,
                profile_image_ text
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id := auth.uid();
    RETURN QUERY
        UPDATE hidden.profiles
            SET
                username = COALESCE(_username, username),
                first_name = COALESCE(_first_name, first_name),
                last_name = COALESCE(_last_name, last_name),
                profile_image = COALESCE(_profile_image, profile_image),
                receive_follow_notifications = COALESCE(_receive_follow_notifications, receive_follow_notifications),
                updated_at = NOW()
            WHERE
                id = auth_user_id
            RETURNING id, first_name, last_name, profile_image;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No profile found for user with id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;

END
$$;
