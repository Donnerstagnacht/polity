-- 1. Increment Following counter
DROP FUNCTION IF EXISTS public.check_if_following_group(
    _following_id uuid
);
CREATE OR REPLACE FUNCTION public.check_if_following_group(
    _following_id uuid
)
    RETURNS boolean
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id = auth.uid();
    RETURN EXISTS (
        SELECT *
        FROM
            hidden.following_groups
        WHERE
              follower = auth_user_id
          AND following = _following_id
    );
END
$$;
