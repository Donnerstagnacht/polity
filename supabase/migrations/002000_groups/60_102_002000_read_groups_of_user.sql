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
    auth_user_id uuid;
BEGIN
    auth_user_id := auth.uid();
    RETURN QUERY (
        SELECT
            group_members.id,
            groups.id,
            groups.name,
            groups.level
        FROM
            hidden.group_members
            JOIN hidden.groups
            ON group_members.group_id = groups.id
        WHERE
            hidden.group_members.member_id = auth_user_id
    );
END
$$;
