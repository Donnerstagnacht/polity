DROP FUNCTION IF EXISTS public.read_group_followings_of_user(
);
CREATE OR REPLACE FUNCTION public.read_group_followings_of_user(
)
    RETURNS table
            (
                id      uuid,
                img_url text,
                name    text,
                level   group_level
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
            authenticated_access.following_groups
            JOIN authenticated_access.groups
            ON following_groups.following = groups.id
        WHERE
            following_groups.follower = auth_user_id
    );
END
$$;
