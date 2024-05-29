DROP FUNCTION IF EXISTS public.update_last_tutorial(
    new_status tutorial_enum
);
CREATE OR REPLACE FUNCTION public.update_last_tutorial(
    new_status tutorial_enum
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
        last_tutorial = new_status
    WHERE
        id = authenticated_user;
END
$$;
