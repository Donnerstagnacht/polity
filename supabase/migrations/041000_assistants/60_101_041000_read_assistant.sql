DROP FUNCTION IF EXISTS public.read_assistant();
CREATE OR REPLACE FUNCTION public.read_assistant()
    RETURNS table
            (
                id            uuid,
                first_sign_in boolean,
                skip_tutorial boolean,
                last_tutorial tutorial_enum
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    authenticated_user uuid;
BEGIN
    authenticated_user := auth.uid();
    RETURN QUERY (
        SELECT *
        FROM
            hidden.assistants
        WHERE
            hidden.assistants.id = authenticated_user
    );
END
$$;
