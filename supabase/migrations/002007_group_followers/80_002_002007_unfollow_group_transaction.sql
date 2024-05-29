DROP FUNCTION IF EXISTS public.unfollow_group_transaction(
    _following_id uuid
);
CREATE OR REPLACE FUNCTION public.unfollow_group_transaction(
    _following_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id := auth.uid();
    PERFORM hidden.delete_group_following_follower_relationship(
        auth_user_id,
        _following_id
            );

    PERFORM hidden.decrement_group_follower_counter(
        _following_id
            );
    PERFORM hidden.decrement_group_following_counter(
        auth_user_id
            );
END;
$$;
