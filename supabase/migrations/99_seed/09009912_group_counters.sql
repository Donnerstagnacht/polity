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

UPDATE authenticated_access.profiles_counters
SET
    group_membership_counter = (
        SELECT
            COUNT(*)
        FROM
            authenticated_access.group_members
        WHERE
            group_members.member_id = profiles_counters.id
    );
