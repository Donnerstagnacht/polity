DROP FUNCTION IF EXISTS authenticated.read_group_members(
    _group_id uuid
);

CREATE OR REPLACE FUNCTION authenticated.read_group_members(
    _group_id uuid
)
    RETURNS table
            (
                id_            uuid,
                group_id_      uuid,
                member_id_     uuid,
                member_type_   hidden.group_member,
                first_name_    text,
                last_name_     text,
                profile_image_ text
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
            hidden.group_members.group_id = _group_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group members found for group id id %', _group_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
