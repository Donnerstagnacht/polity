DROP FUNCTION IF EXISTS public.read_following_of_group(
    _group_id uuid
);
CREATE OR REPLACE FUNCTION public.read_following_of_group(
    _group_id uuid
)
    RETURNS table
            (
                id            uuid,
                profile_image text,
                first_name    text,
                last_name     text
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
END
$$;
