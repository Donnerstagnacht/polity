DROP FUNCTION IF EXISTS public.remove_follower_of_authenticated_user_transaction(
    follower_id uuid
);
CREATE OR REPLACE FUNCTION public.remove_follower_of_authenticated_user_transaction(
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
    PERFORM hidden.delete_following_follower_relationship(
        follower_id,
        following_authenticated_user
            );

    PERFORM hidden.decrement_follower_counter(
        following_authenticated_user
            );
    PERFORM hidden.decrement_following_counter(
        follower_id
            );
END;
$$;
