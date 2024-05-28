DROP FUNCTION IF EXISTS public.remove_group_follower_transaction(
    follower_id uuid,
    group_id_in uuid
);
CREATE OR REPLACE FUNCTION public.remove_group_follower_transaction(
    follower_id uuid,
    group_id_in uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM authenticated_access.delete_group_following_follower_relationship(
        follower_id,
        group_id_in
            );

    PERFORM authenticated_access.decrement_group_follower_counter(
        group_id_in
            );
    PERFORM authenticated_access.decrement_group_following_counter(
        follower_id
            );
END;
$$;
