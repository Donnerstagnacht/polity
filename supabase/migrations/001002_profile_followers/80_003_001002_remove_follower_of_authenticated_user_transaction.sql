DROP FUNCTION IF EXISTS authenticated.remove_follower_of_authenticated_user_transaction(
    _follower_id uuid
);
CREATE OR REPLACE FUNCTION authenticated.remove_follower_of_authenticated_user_transaction(
    _follower_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    following_authenticated_user uuid;
BEGIN
    following_authenticated_user = auth.uid();
    PERFORM hidden.profile_followers_delete(
        _follower_id,
        following_authenticated_user
            );

    PERFORM hidden.decrement_profile_follower_counter(
        following_authenticated_user
            );
    PERFORM hidden.decrement_profile_following_counter(
        _follower_id
            );
END;
$$;
