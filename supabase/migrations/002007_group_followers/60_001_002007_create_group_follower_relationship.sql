DROP FUNCTION IF EXISTS hidden.create_group_following_follower_relationship(
    follower_id uuid,
    following_id uuid
);
CREATE OR REPLACE FUNCTION hidden.create_group_following_follower_relationship(
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
        hidden.following_groups (follower,
                                               following)
    VALUES
        (follower_id,
         following_id);
END;
$$;
