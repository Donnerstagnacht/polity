DROP FUNCTION IF EXISTS public.read_group_member_requests(
    _group_id uuid);

CREATE OR REPLACE FUNCTION public.read_group_member_requests(
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
            hidden.group_member_requests.id,
            hidden.group_member_requests.group_id,
            hidden.group_member_requests.member_id,
            hidden.group_member_requests.member_type,
            hidden.profiles.first_name,
            hidden.profiles.last_name,
            hidden.profiles.profile_image
        FROM
            hidden.group_member_requests
            INNER JOIN hidden.profiles
            ON hidden.group_member_requests.member_id = hidden.profiles.id
        WHERE
            hidden.group_member_requests.group_id = _group_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member request found for group id % and user id %', _group_id, _user_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
