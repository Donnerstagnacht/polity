DROP FUNCTION IF EXISTS authenticated.read_followings_of_group(
    _group_id uuid
);
CREATE OR REPLACE FUNCTION authenticated.read_followings_of_group(
    _group_id uuid
)
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
BEGIN
    RETURN QUERY
        (
            SELECT
                profiles.id,
                profiles.profile_image,
                profiles.first_name,
                profiles.last_name
            FROM
                hidden.following_groups
                JOIN hidden.profiles
                ON following_groups.following = profiles.id
            WHERE
                following_groups.follower = _group_id
        );

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group followings found for group id %', _group_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
