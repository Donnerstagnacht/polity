DROP FUNCTION IF EXISTS authenticated.accept_group_membership_request_transaction(
    _request_id uuid
);
CREATE OR REPLACE FUNCTION authenticated.accept_group_membership_request_transaction(
    _request_id uuid
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
        authenticated.group_member_requests_delete_by_id(
            _request_id
        );

    PERFORM hidden.group_members_create(
        membership.group_id,
        membership.member_id,
        'member'
            );

    PERFORM hidden.increment_group_member_counter(
        membership.group_id
            );

    PERFORM hidden.increment_profile_group_membership_counter(
        membership.member_id
            );
END
$$
