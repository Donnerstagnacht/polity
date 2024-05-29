DROP FUNCTION IF EXISTS public.follow_group_transaction(
    following_id uuid
);
CREATE OR REPLACE FUNCTION public.follow_group_transaction(
    following_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    follow_enum notifications_enum;
    follower_id uuid;
BEGIN
    follow_enum := 'follow_from_user';
    follower_id := auth.uid();
    PERFORM hidden.create_group_following_follower_relationship(
        follower_id,
        following_id
            );
    PERFORM hidden.increment_group_follower_counter(
        following_id
            );
    PERFORM hidden.increment_following_counter(
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
