DROP FUNCTION IF EXISTS authenticated.group_member_requests_of_user_read();

CREATE OR REPLACE FUNCTION authenticated.group_member_requests_of_user_read()
    RETURNS table
            (
                id_          uuid,
                group_id_    uuid,
                group_name_  text,
                group_level_ hidden.group_level
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
            group_member_requests.id,
            groups.id,
            groups.name,
            groups.level
        FROM
            hidden.group_member_requests
            JOIN hidden.groups
            ON group_member_requests.group_id = groups.id
        WHERE
            hidden.group_member_requests.member_id = auth_user_id
    );

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member request found for user id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
