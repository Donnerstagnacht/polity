DROP FUNCTION IF EXISTS authenticated_access.insert_group_following_follower_relationship(
    follower_id uuid,
    following_id uuid
);
CREATE OR REPLACE FUNCTION authenticated_access.insert_group_following_follower_relationship(
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

DROP FUNCTION IF EXISTS authenticated_access.delete_group_following_follower_relationship(
    follower_id uuid,
    following_id uuid
);
CREATE OR REPLACE FUNCTION authenticated_access.delete_group_following_follower_relationship(
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
        authenticated_access.following_profiles
    WHERE
          follower = follower_id
      AND following = following_id;

    IF NOT FOUND THEN
        -- Raise an exception to roll back the transaction
        RAISE EXCEPTION 'Error in unfollow_transaction: %', SQLERRM;
    END IF;
END;
$$;

