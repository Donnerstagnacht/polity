DROP FUNCTION IF EXISTS public.update_first_sign_in(
    user_id uuid,
    new_status boolean
);
CREATE OR REPLACE FUNCTION public.update_first_sign_in(
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
        first_sign_in = new_status
    WHERE
        id = user_id;
END
$$;
