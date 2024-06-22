-- count all group members of a group
UPDATE hidden.groups_counters
SET
    group_member_counter = (
        SELECT
            COUNT(*)
        FROM
            hidden.group_members
        WHERE
            group_members.group_id = groups_counters.id
    );

-- count all group memberships of a user
UPDATE hidden.profiles_counters
SET
    group_membership_counter = (
        SELECT
            COUNT(*)
        FROM
            hidden.group_members
        WHERE
            group_members.member_id = profiles_counters.id
    );

-- count all followers of a group
UPDATE hidden.groups_counters
SET
    follower_counter = (
        SELECT
            COUNT(*)
        FROM
            hidden.following_groups
        WHERE
            following_groups.following = groups_counters.id
    );

-- count all followings of a user (e.g. other users and groups)
UPDATE hidden.profiles_counters
SET
    following_counter = (
                            SELECT
                                COUNT(*)
                            FROM
                                hidden.following_profiles
                            WHERE
                                following_profiles.follower = profiles_counters.id
                        ) + (
                            SELECT
                                COUNT(*)
                            FROM
                                hidden.following_groups
                            WHERE
                                following_groups.follower = profiles_counters.id
                        );
