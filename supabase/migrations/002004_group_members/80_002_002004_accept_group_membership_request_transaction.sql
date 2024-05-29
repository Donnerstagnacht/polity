DROP FUNCTION IF EXISTS public.accept_group_membership_request_transaction(
    request_id uuid
);
CREATE OR REPLACE FUNCTION public.accept_group_membership_request_transaction(
    request_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    membership membership;
BEGIN
    membership :=
        public.delete_group_member_request_by_id(
            request_id
        );

    PERFORM authenticated_access.create_group_member(
        membership.group_id,
        membership.member_id,
        'member'
            );

    PERFORM authenticated_access.increment_group_member_counter(
        membership.group_id
            );

    PERFORM authenticated_access.increment_profile_group_membership_counter(
        membership.member_id
            );
END
$$
