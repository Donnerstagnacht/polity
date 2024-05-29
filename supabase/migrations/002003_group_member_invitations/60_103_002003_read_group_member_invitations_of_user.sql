DROP FUNCTION IF EXISTS public.read_group_member_invitations_of_user();

CREATE OR REPLACE FUNCTION public.read_group_member_invitations_of_user()
    RETURNS table
            (
                id_          uuid,
                group_id_    uuid,
                group_name_  text,
                group_level_ group_level
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
            group_invited_members.id,
            groups.id,
            groups.name,
            groups.level
        FROM
            hidden.group_invited_members
            JOIN hidden.groups
            ON group_invited_members.group_id = groups.id
        WHERE
            hidden.group_invited_members.member_id = auth_user_id
    );

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member invitation found for user id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
