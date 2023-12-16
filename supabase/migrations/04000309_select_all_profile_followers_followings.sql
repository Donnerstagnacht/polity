DROP FUNCTION IF EXISTS public.select_follower_of_user();
CREATE OR REPLACE FUNCTION public.select_follower_of_user()
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
DECLARE
    authenticated_user uuid;
BEGIN
    authenticated_user := auth.uid();
    RETURN QUERY (
        SELECT
            profiles.id,
            public.profiles.profile_image,
            profiles.first_name,
            profiles.last_name
        FROM
            authenticated_access.following_profiles
            JOIN public.profiles
            ON following_profiles.follower = profiles.id
        WHERE
            following_profiles.following = authenticated_user
    );
END
$$;

DROP FUNCTION IF EXISTS public.select_following_of_user();
CREATE OR REPLACE FUNCTION public.select_following_of_user()
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
DECLARE
    authenticated_user uuid;
BEGIN
    authenticated_user := auth.uid();
    RETURN QUERY
        (
            SELECT
                profiles.id,
                public.profiles.profile_image,
                profiles.first_name,
                profiles.last_name
            FROM
                authenticated_access.following_profiles
                JOIN public.profiles
                ON following_profiles.following = profiles.id
            WHERE
                following_profiles.follower = authenticated_user
        );
END
$$;
