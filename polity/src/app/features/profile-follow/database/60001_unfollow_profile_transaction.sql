-- 1. UnFollow profile Transaction
DROP FUNCTION IF EXISTS public.unfollow_transaction(follower_id uuid, following_id uuid);
CREATE OR REPLACE FUNCTION public.unfollow_transaction(follower_id uuid, following_id uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
BEGIN
    PERFORM hidden_functions.delete_following_follower_relationship(follower_id, following_id);
    PERFORM idden_functions.decrement_follower_counter(following_id);
    PERFORM idden_functions.decrement_following_counter(follower_id);
END;
$$;
