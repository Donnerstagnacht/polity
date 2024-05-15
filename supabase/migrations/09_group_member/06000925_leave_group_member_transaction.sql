DROP FUNCTION IF EXISTS public.leave_group_by_membership_id_transaction(
    membership_id_in uuid
);
CREATE OR REPLACE FUNCTION public.leave_group_by_membership_id_transaction(
    membership_id_in uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    membership membership ;
BEGIN
    membership := authenticated_access.delete_group_member_by_id(
        membership_id_in
                  );

    PERFORM authenticated_access.decrement_group_member_counter(
        membership.group_id
            );

    PERFORM authenticated_access.decrement_profile_group_membership_counter(
        membership.member_id
            );
END
$$
