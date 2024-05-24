-- count all group members of a group
UPDATE authenticated_access.groups_counters
SET
    group_member_counter = (
        SELECT
            COUNT(*)
        FROM
            authenticated_access.group_members
        WHERE
            group_members.group_id = groups_counters.id
    );

-- count all followers of a group
UPDATE authenticated_access.groups_counters
SET
    follower_counter = (
        SELECT
            COUNT(*)
        FROM
            authenticated_access.following_groups
        WHERE
            following_groups.following = groups_counters.id
    );

-- count all followings of a user (e.g. other users and groups)
UPDATE authenticated_access.profiles_counters
SET
    following_counter = (
                            SELECT
                                COUNT(*)
                            FROM
                                authenticated_access.following_profiles
                            WHERE
                                following_profiles.follower = profiles_counters.id
                        ) + (
                            SELECT
                                COUNT(*)
                            FROM
                                authenticated_access.following_groups
                            WHERE
                                following_groups.follower = profiles_counters.id
                        );
