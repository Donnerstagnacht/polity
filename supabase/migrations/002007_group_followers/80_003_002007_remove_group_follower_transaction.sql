DROP FUNCTION IF EXISTS authenticated.remove_group_follower_transaction(
    _follower_id uuid,
    _group_id_in uuid
);
CREATE OR REPLACE FUNCTION authenticated.remove_group_follower_transaction(
    _follower_id uuid,
    _group_id_in uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM hidden.group_followers_delete(
        _follower_id,
        _group_id_in
            );

    PERFORM hidden.decrement_group_follower_counter(
        _group_id_in
            );
    PERFORM hidden.decrement_profile_following_counter(
        _follower_id
            );
END;
$$;
