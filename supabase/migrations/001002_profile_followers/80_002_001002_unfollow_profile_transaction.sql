DROP FUNCTION IF EXISTS public.unfollow_profile_transaction(
    _following_id uuid
);
CREATE OR REPLACE FUNCTION public.unfollow_profile_transaction(
    _following_id uuid
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
    PERFORM hidden.delete_profile_follower_relationship(
        authenticated_user,
        _following_id
            );

    PERFORM hidden.decrement_profile_follower_counter(
        _following_id
            );
    PERFORM hidden.decrement_profile_following_counter(
        authenticated_user
            );
END;
$$;
