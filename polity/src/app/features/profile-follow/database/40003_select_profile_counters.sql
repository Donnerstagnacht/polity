-- 1. Increment Following counter
DROP FUNCTION IF EXISTS public.select_following_counter(user_id uuid);
CREATE OR REPLACE FUNCTION public.select_following_counter(user_id uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    --TODO: Create function

END
$$;
