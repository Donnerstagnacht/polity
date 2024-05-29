DROP FUNCTION IF EXISTS hidden.create_profile_follower_relationship(
    follower_id uuid,
    following_id uuid
);
CREATE OR REPLACE FUNCTION hidden.create_profile_follower_relationship(
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
        hidden.following_profiles (follower,
                                                 following)
    VALUES
        (follower_id,
         following_id);
END;
$$;
