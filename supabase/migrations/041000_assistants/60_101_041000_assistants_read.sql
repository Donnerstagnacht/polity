DROP FUNCTION IF EXISTS authenticated.assistants_read();
CREATE OR REPLACE FUNCTION authenticated.assistants_read()
    RETURNS table
            (
                id_            uuid,
                first_sign_in_ boolean,
                skip_tutorial_ boolean,
                last_tutorial_ hidden.tutorial_enum
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
        SELECT *
        FROM
            hidden.assistants
        WHERE
            id = auth_user_id
    );

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No assistant found for user id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
