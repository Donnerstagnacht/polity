DROP FUNCTION IF EXISTS authenticated.group_member_request_read_ones(
    _group_id uuid);

CREATE OR REPLACE FUNCTION authenticated.group_member_request_read_ones(
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
        RAISE EXCEPTION 'No group member request found for group id %', _group_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
