DROP FUNCTION IF EXISTS public.update_first_sign_in(
    _new_status boolean
);
CREATE OR REPLACE FUNCTION public.update_first_sign_in(
    _new_status boolean
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
        first_sign_in = _new_status
    WHERE
        id = auth_user_id;
END
$$;
