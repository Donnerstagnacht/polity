DROP FUNCTION IF EXISTS public.accept_group_invitation_transaction(
    group_id_in uuid
);
CREATE OR REPLACE FUNCTION public.accept_group_invitation_transaction(
    group_id_in uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    deleted_group delete_group;
BEGIN
    deleted_group := public.delete_group_member_invitation(
        group_id_in
                     );

    PERFORM authenticated_access.create_group_member(
        deleted_group.group_id,
        deleted_group.member_id,
        'member'
            );

    PERFORM authenticated_access.increment_group_member_counter(
        deleted_group.group_id
            );

    PERFORM authenticated_access.increment_profile_group_membership_counter(
        deleted_group.member_id
            );
END
$$
