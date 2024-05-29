DROP FUNCTION IF EXISTS authenticated.read_followings_of_user();
CREATE OR REPLACE FUNCTION authenticated.read_followings_of_user()
    RETURNS table
            (
                id_            uuid,
                profile_image_ text,
                first_name_    text,
                last_name_     text
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
        (
            SELECT
                profiles.id,
                profiles.profile_image,
                profiles.first_name,
                profiles.last_name
            FROM
                hidden.following_profiles
                JOIN hidden.profiles
                ON following_profiles.following = profiles.id
            WHERE
                following_profiles.follower = auth_user_id
        );

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No followings found for user with id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
