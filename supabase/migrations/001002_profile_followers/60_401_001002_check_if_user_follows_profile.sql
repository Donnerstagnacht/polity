-- 1. Increment Following counter
DROP FUNCTION IF EXISTS authenticated.check_if_user_follows_profile(
    _following_id uuid
);
CREATE OR REPLACE FUNCTION authenticated.check_if_user_follows_profile(
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
            hidden.following_profiles
        WHERE
              follower = auth_user_id
          AND following = _following_id
    );
END
$$;
