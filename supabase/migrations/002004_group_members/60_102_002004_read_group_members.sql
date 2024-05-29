DROP FUNCTION IF EXISTS public.read_group_members(uuid);

CREATE OR REPLACE FUNCTION public.read_group_members(
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
            hidden.group_members.id,
            hidden.group_members.group_id,
            hidden.group_members.member_id,
            hidden.group_members.member_type,
            hidden.profiles.first_name,
            hidden.profiles.last_name,
            hidden.profiles.profile_image
        FROM
            hidden.group_members
            INNER JOIN hidden.profiles
            ON hidden.group_members.member_id = hidden.profiles.id
        WHERE
            hidden.group_members.group_id = group_id_in;
END;
$$;
