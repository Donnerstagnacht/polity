DROP FUNCTION IF EXISTS public.update_skip_tutorial(
    _new_status boolean
);
CREATE OR REPLACE FUNCTION public.update_skip_tutorial(
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
        skip_tutorial = _new_status
    WHERE
        id = auth_user_id;
END
$$;
