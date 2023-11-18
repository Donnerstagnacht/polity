DROP FUNCTION IF EXISTS public.create_notification_from_user_transaction(
    sender uuid,
    receiver uuid,
    type_of_notification text,
    read_by_receiver boolean
);
CREATE OR REPLACE FUNCTION public.create_notification_from_user_transaction(
    sender uuid,
    receiver uuid,
    type_of_notification text,
    read_by_receiver boolean
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
BEGIN
    PERFORM hidden_functions.delete_following_follower_relationship(follower_id, following_id);
    PERFORM hidden_functions.decrement_follower_counter(following_id);
    PERFORM hidden_functions.decrement_following_counter(follower_id);
END;
$$;
