-- 1. Increment Following counter
DROP FUNCTION IF EXISTS public.check_if_following(
    follower_id uuid,
    following_id uuid
);
CREATE OR REPLACE FUNCTION public.check_if_following(
    follower_id uuid,
    following_id uuid
)
    RETURNS boolean
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN EXISTS (
        SELECT *
        FROM
            following_profiles
        WHERE
              follower = follower_id
          AND following = following_id
    );
END
$$;
