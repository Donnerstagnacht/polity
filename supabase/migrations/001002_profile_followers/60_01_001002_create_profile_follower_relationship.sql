DROP FUNCTION IF EXISTS authenticated_access.create_profile_follower_relationship(
    follower_id uuid,
    following_id uuid
);
CREATE OR REPLACE FUNCTION authenticated_access.create_profile_follower_relationship(
    follower_id uuid,
    following_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    INSERT INTO
        authenticated_access.following_profiles (follower,
                                                 following)
    VALUES
        (follower_id,
         following_id);
END;
$$;
