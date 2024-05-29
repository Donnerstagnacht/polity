DROP FUNCTION IF EXISTS public.accept_group_invitation_by_id_transaction(
    _invitation_id uuid
);
CREATE OR REPLACE FUNCTION public.accept_group_invitation_by_id_transaction(
    _invitation_id uuid
)
    RETURNS membership
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    deleted_invitation membership;
    new_membership     membership;
BEGIN
    deleted_invitation := public.delete_group_member_invitation_by_id(
        _invitation_id
                          );

    new_membership := hidden.create_group_member(
        deleted_invitation.group_id,
        deleted_invitation.member_id,
        'member'
                      );

    PERFORM hidden.increment_group_member_counter(
        deleted_invitation.group_id
            );

    PERFORM hidden.increment_profile_group_membership_counter(
        deleted_invitation.member_id
            );
    RETURN new_membership;
END
$$
