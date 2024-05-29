DROP FUNCTION IF EXISTS hidden.delete_profile_follower_relationship(
    follower_id uuid,
    following_id uuid
);
CREATE OR REPLACE FUNCTION hidden.delete_profile_follower_relationship(
    follower_id uuid,
    following_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    DELETE
    FROM
        hidden.following_profiles
    WHERE
          follower = follower_id
      AND following = following_id;

    IF NOT FOUND THEN
        -- Raise an exception to roll back the transaction
        RAISE EXCEPTION 'Error in unfollow_transaction: %', SQLERRM;
    END IF;
END;
$$;

