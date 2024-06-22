DROP FUNCTION IF EXISTS authenticated.assistants_skip_tutorial_update(
    _new_status boolean
);
CREATE OR REPLACE FUNCTION authenticated.assistants_skip_tutorial_update(
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
                skip_tutorial = _new_status
            WHERE
                id = auth_user_id
            RETURNING id_, first_sign_in_, skip_tutorial_, last_tutorial_;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No assistant found for user id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
