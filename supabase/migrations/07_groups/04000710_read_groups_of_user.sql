DROP FUNCTION IF EXISTS public.read_groups_of_user();

CREATE OR REPLACE FUNCTION public.read_groups_of_user()
    RETURNS table
            (
                id          uuid,
                group_id    uuid,
                group_name  text,
                group_level group_level
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
            group_members.id,
            groups.id,
            groups.name,
            groups.level
        FROM
            authenticated_access.group_members
            JOIN authenticated_access.groups
            ON group_members.group_id = groups.id
        WHERE
            authenticated_access.group_members.member_id = authenticated_user
    );
END
$$;
