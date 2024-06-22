DROP FUNCTION IF EXISTS authenticated.accept_group_invitation_transaction(
    _group_id uuid
);
CREATE OR REPLACE FUNCTION authenticated.accept_group_invitation_transaction(
    _group_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    membership membership;
BEGIN
    membership := authenticated.group_member_invitations_delete(
        _group_id
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
