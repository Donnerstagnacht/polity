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
    group_id  uuid;
    member_id uuid;
BEGIN
    SELECT
        group_id,
        member_id
    INTO
        group_id,
        member_id
    FROM
        public.delete_group_member_request(
            request_id
        );

    PERFORM authenticated_access.create_group_member(
        group_id,
        member_id,
        'member'
            );

    PERFORM authenticated_access.increment_group_member_counter(
        group_id
            );

    PERFORM authenticated_access.increment_profile_group_membership_counter(
        member_id
            );
END
$$
