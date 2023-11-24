DROP FUNCTION IF EXISTS public.update_skip_tutorial(
    user_id uuid,
    new_status boolean
);
CREATE OR REPLACE FUNCTION public.update_skip_tutorial(
    user_id uuid,
    new_status boolean
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    UPDATE public.assistants
    SET
        skip_tutorial = new_status
    WHERE
        id = user_id;
END
$$;
