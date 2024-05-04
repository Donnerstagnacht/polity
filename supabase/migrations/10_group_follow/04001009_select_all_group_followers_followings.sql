DROP FUNCTION IF EXISTS public.select_follower_of_group(
    group_id_in uuid
);
CREATE OR REPLACE FUNCTION public.select_follower_of_group(
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
            authenticated_access.following_groups
            JOIN authenticated_access.profiles
            ON following_groups.follower = profiles.id
        WHERE
            following_groups.following = group_id_in
    );
END
$$;

DROP FUNCTION IF EXISTS public.select_following_of_group(
    group_id_in uuid
);
CREATE OR REPLACE FUNCTION public.select_following_of_group(
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
    RETURN QUERY
        (
            SELECT
                profiles.id,
                profiles.profile_image,
                profiles.first_name,
                profiles.last_name
            FROM
                authenticated_access.following_groups
                JOIN authenticated_access.profiles
                ON following_groups.following = profiles.id
            WHERE
                following_groups.follower = group_id_in
        );
END
$$;
