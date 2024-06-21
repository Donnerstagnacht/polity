DROP FUNCTION IF EXISTS authenticated.follow_group_transaction(
    _following_id uuid
);
CREATE OR REPLACE FUNCTION authenticated.follow_group_transaction(
    _following_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    follow_enum hidden.notifications_enum;
    follower_id uuid;
BEGIN
    follow_enum := 'follow_from_user';
    follower_id := auth.uid();
    PERFORM hidden.group_followers_create(
        follower_id,
        _following_id
            );
    PERFORM hidden.increment_group_follower_counter(
        _following_id
            );
    PERFORM hidden.increment_profile_following_counter(
        follower_id
            );
    --     PERFORM hidden.create_notification_from_user_transaction(
--         follower_id,
--         following_id,
--         follow_enum,
--         FALSE
--             );
END;
$$;
