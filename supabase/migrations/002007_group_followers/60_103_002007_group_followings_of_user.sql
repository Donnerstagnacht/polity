DROP FUNCTION IF EXISTS authenticated.group_followings_of_user_read(
);
CREATE OR REPLACE FUNCTION authenticated.group_followings_of_user_read(
)
    RETURNS table
            (
                id_      uuid,
                img_url_ text,
                name_    text,
                level_   hidden.group_level
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id := auth.uid();
    RETURN QUERY (
        SELECT
            groups.id,
            groups.img_url,
            groups.name,
            groups.level
        FROM
            hidden.following_groups
            JOIN hidden.groups
            ON following_groups.following = groups.id
        WHERE
            following_groups.follower = auth_user_id
    );

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group followings found for user id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
