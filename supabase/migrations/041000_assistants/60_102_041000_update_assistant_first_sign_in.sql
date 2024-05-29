DROP FUNCTION IF EXISTS public.update_first_sign_in(
    new_status boolean
);
CREATE OR REPLACE FUNCTION public.update_first_sign_in(
    new_status boolean
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    authenticated_user uuid;
BEGIN
    authenticated_user := auth.uid();
    UPDATE hidden.assistants
    SET
        first_sign_in = new_status
    WHERE
        id = authenticated_user;
END
$$;
