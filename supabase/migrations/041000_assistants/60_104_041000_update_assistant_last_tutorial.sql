DROP FUNCTION IF EXISTS public.update_last_tutorial(
    _new_status tutorial_enum
);
CREATE OR REPLACE FUNCTION public.update_last_tutorial(
    _new_status tutorial_enum
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id := auth.uid();
    UPDATE hidden.assistants
    SET
        last_tutorial = _new_status
    WHERE
        id = auth_user_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No assistant found for user id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
