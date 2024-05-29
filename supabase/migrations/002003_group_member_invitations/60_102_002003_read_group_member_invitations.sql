DROP FUNCTION IF EXISTS public.read_group_member_invitations(
    _group_id uuid
);

CREATE OR REPLACE FUNCTION public.read_group_member_invitations(
    _group_id uuid
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
            hidden.group_invited_members.id,
            hidden.group_invited_members.group_id,
            hidden.group_invited_members.member_id,
            hidden.group_invited_members.member_type,
            hidden.profiles.first_name,
            hidden.profiles.last_name,
            hidden.profiles.profile_image
        FROM
            hidden.group_invited_members
            INNER JOIN hidden.profiles
            ON hidden.group_invited_members.member_id = hidden.profiles.id
        WHERE
            hidden.group_invited_members.group_id = _group_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member invitation found for group id %', _group_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
