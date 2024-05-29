DROP FUNCTION IF EXISTS hidden.create_group_follower_relationship(
    _follower_id uuid,
    _following_id uuid
);
CREATE OR REPLACE FUNCTION hidden.create_group_follower_relationship(
    _follower_id uuid,
    _following_id uuid
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
        (_follower_id,
         _following_id);
END;
$$;
