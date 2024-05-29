DROP FUNCTION IF EXISTS public.read_follower_of_group(
    group_id_in uuid
);
CREATE OR REPLACE FUNCTION public.read_follower_of_group(
    group_id_in uuid
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
    RETURN QUERY (
        SELECT
            profiles.id,
            profiles.profile_image,
            profiles.first_name,
            profiles.last_name
        FROM
            hidden.following_groups
            JOIN hidden.profiles
            ON following_groups.follower = profiles.id
        WHERE
            following_groups.following = group_id_in
    );
END
$$;
