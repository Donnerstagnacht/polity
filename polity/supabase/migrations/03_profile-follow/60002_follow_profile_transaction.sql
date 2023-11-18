DROP FUNCTION IF EXISTS public.follow_transaction(
    follower_id uuid,
    following_id uuid
);
CREATE OR REPLACE FUNCTION public.follow_transaction(
    follower_id uuid,
    following_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
DECLARE
    follow_enum notifications_enum;
BEGIN
    follow_enum := 'follow_from_user';
    PERFORM hidden_functions.insert_following_follower_relationship(
        follower_id,
        following_id
        );
    PERFORM hidden_functions.increment_follower_counter(
        following_id
        );
    PERFORM hidden_functions.increment_following_counter(
        follower_id
        );
    PERFORM public.create_notification_from_user_transaction(
        follower_id,
        following_id,
        follow_enum,
        FALSE
        );
END;
$$;
