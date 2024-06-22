UPDATE hidden.profiles_counters
SET
    follower_counter = (
        SELECT
            COUNT(*)
        FROM
            hidden.following_profiles
        WHERE
            following_profiles.following = profiles_counters.id
    );

UPDATE hidden.profiles_counters
SET
    following_counter = (
        SELECT
            COUNT(*)
        FROM
            hidden.following_profiles
        WHERE
            following_profiles.follower = profiles_counters.id
    );
