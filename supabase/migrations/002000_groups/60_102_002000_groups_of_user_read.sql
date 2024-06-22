DROP FUNCTION IF EXISTS authenticated.groups_of_user_read();

CREATE OR REPLACE FUNCTION authenticated.groups_of_user_read()
    RETURNS table
            (
                id_          uuid,
                group_id_    uuid,
                group_name_  text,
                group_level_ hidden.group_level,
                img_url_     text
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
            groups.level,
            groups.img_url
        FROM
            hidden.group_members
            JOIN hidden.groups
            ON group_members.group_id = groups.id
        WHERE
            hidden.group_members.member_id = auth_user_id
    );

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group found for user id % ', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
