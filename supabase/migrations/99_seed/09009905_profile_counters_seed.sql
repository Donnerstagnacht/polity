UPDATE authenticated_access.profiles_counters
SET
    follower_counter = (
        SELECT
            COUNT(*)
        FROM
            authenticated_access.following_profiles
        WHERE
            following_profiles.following = profiles_counters.id
    );

UPDATE authenticated_access.profiles_counters
SET
    following_counter = (
        SELECT
            COUNT(*)
        FROM
            authenticated_access.following_profiles
        WHERE
            following_profiles.follower = profiles_counters.id
    );
