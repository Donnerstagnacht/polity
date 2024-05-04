DROP FUNCTION IF EXISTS public.remove_group_follower_transaction(
    follower_id uuid
);
CREATE OR REPLACE FUNCTION public.remove_group_follower_transaction(
    follower_id uuid
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
    PERFORM authenticated_access.delete_group_following_follower_relationship(
        follower_id,
        following_authenticated_user
            );

    PERFORM authenticated_access.decrement_group_follower_counter(
        following_authenticated_user
            );
    PERFORM authenticated_access.decrement_group_following_counter(
        follower_id
            );
END;
$$;
