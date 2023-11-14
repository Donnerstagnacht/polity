DROP FUNCTION IF EXISTS public.follow_transaction(
    follower_id uuid,
    following_id uuid,
    title_in text,
    message_in text,
    type_in text,
    for_admins_in boolean
);
CREATE OR REPLACE FUNCTION public.follow_transaction(
    follower_id uuid,
    following_id uuid,
    title_in text,
    message_in text,
    type_in text,
    for_admins_in boolean
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
DECLARE
BEGIN
    PERFORM hidden_functions.insert_following_follower_relationship(follower_id, following_id);
    PERFORM hidden_functions.increment_follower_counter(following_id);
    PERFORM hidden_functions.increment_following_counter(follower_id);
END;
$$;
