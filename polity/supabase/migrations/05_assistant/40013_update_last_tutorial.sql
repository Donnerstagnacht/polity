DROP FUNCTION IF EXISTS public.update_last_tutorial(
    user_id uuid,
    new_status tutorial_enum
);
CREATE OR REPLACE FUNCTION public.update_last_tutorial(
    user_id uuid,
    new_status tutorial_enum
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    UPDATE public.assistants
    SET
        last_tutorial = new_status
    WHERE
        id = user_id;
END
$$;
