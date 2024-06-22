DROP FUNCTION IF EXISTS authenticated.assistants_first_sign_in_update(
    _new_status boolean
);
CREATE OR REPLACE FUNCTION authenticated.assistants_first_sign_in_update(
    _new_status boolean
)
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
    RETURN QUERY
        UPDATE hidden.assistants
            SET
                first_sign_in = _new_status
            WHERE
                id = auth_user_id
            RETURNING id_, first_sign_in, skip_tutorial, last_tutorial;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No assistant found for user id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
