-- 1. Increment Following counter
DROP FUNCTION IF EXISTS public.check_if_following_group(
    following_id uuid
);
CREATE OR REPLACE FUNCTION public.check_if_following_group(
    following_id uuid
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
            authenticated_access.following_groups
        WHERE
              follower = auth_user_id
          AND following = following_id
    );
END
$$;
