DROP FUNCTION IF EXISTS public.unfollow_group_transaction(
    following_id uuid
);
CREATE OR REPLACE FUNCTION public.unfollow_group_transaction(
    following_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    authenticated_user uuid;
BEGIN
    authenticated_user := auth.uid();
    PERFORM authenticated_access.delete_group_following_follower_relationship(
        authenticated_user,
        following_id
            );

    PERFORM authenticated_access.decrement_group_follower_counter(
        following_id
            );
    PERFORM authenticated_access.decrement_following_counter(
        authenticated_user
            );
END;
$$;
