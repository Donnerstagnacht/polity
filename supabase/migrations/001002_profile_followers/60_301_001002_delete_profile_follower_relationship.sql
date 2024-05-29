DROP FUNCTION IF EXISTS hidden.delete_profile_follower_relationship(
    _follower_id uuid,
    _following_id uuid
);
CREATE OR REPLACE FUNCTION hidden.delete_profile_follower_relationship(
    _follower_id uuid,
    _following_id uuid
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
          follower = _follower_id
      AND following = _following_id;

    IF NOT FOUND THEN
        -- Raise an exception to roll back the transaction
        RAISE EXCEPTION 'Error in unfollow_transaction: %', SQLERRM;
    END IF;
END;
$$;

