DROP FUNCTION IF EXISTS authenticated.leave_group_by_membership_id_transaction(
    _membership_id uuid
);
CREATE OR REPLACE FUNCTION authenticated.leave_group_by_membership_id_transaction(
    _membership_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    membership membership ;
BEGIN
    membership := hidden.delete_group_member_by_id(
        _membership_id
                  );

    PERFORM hidden.decrement_group_member_counter(
        membership.group_id
            );

    PERFORM hidden.decrement_profile_group_membership_counter(
        membership.member_id
            );
END
$$
