DROP FUNCTION IF EXISTS public.read_group_member_invitations(uuid);

CREATE OR REPLACE FUNCTION public.read_group_member_invitations(
    group_id_in uuid
)
    RETURNS table
            (
                id            uuid,
                group_id      uuid,
                member_id     uuid,
                member_type   group_member,
                first_name    text,
                last_name     text,
                profile_image text
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT
            authenticated_access.group_invited_members.id,
            authenticated_access.group_invited_members.group_id,
            authenticated_access.group_invited_members.member_id,
            authenticated_access.group_invited_members.member_type,
            authenticated_access.profiles.first_name,
            authenticated_access.profiles.last_name,
            authenticated_access.profiles.profile_image
        FROM
            authenticated_access.group_invited_members
            INNER JOIN authenticated_access.profiles
            ON authenticated_access.group_invited_members.member_id = authenticated_access.profiles.id
        WHERE
            authenticated_access.group_invited_members.group_id = group_id_in;
END;
$$;
