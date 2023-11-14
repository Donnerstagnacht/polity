DROP FUNCTION IF EXISTS hidden_functions.insert_following_follower_relationship(follower uuid, following uuid);
CREATE OR REPLACE FUNCTION hidden_functions.insert_following_follower_relationship(follower uuid, following uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    INSERT INTO following_profiles (follower, following)
    VALUES (follower, following);
END;
$$;

DROP FUNCTION IF EXISTS hidden_functions.delete_following_follower_relationship(follower_id uuid, following_id uuid);
CREATE OR REPLACE FUNCTION hidden_functions.delete_following_follower_relationship(follower_id uuid, following_id uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    DELETE
    FROM
        following_profiles
    WHERE
          follower = follower_id
      AND following = following_id;
END;
$$;

