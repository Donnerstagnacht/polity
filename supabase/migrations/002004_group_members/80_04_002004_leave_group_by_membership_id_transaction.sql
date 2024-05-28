DROP FUNCTION IF EXISTS public.leave_group_member_transaction(
    group_id_in uuid
);
CREATE OR REPLACE FUNCTION public.leave_group_member_transaction(
    group_id_in uuid
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
    PERFORM authenticated_access.delete_group_member(
        authenticated_user,
        group_id_in
            );

    PERFORM authenticated_access.decrement_group_member_counter(
        group_id_in
            );

    PERFORM authenticated_access.decrement_profile_group_membership_counter(
        authenticated_user
            );
END
$$
