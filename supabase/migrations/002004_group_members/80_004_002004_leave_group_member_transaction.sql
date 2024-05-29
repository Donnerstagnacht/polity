DROP FUNCTION IF EXISTS authenticated.leave_group_member_transaction(
    group_id uuid
);
CREATE OR REPLACE FUNCTION authenticated.leave_group_member_transaction(
    _group_id uuid
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
    PERFORM hidden.delete_group_member(
        authenticated_user,
        _group_id
            );

    PERFORM hidden.decrement_group_member_counter(
        _group_id
            );

    PERFORM hidden.decrement_profile_group_membership_counter(
        authenticated_user
            );
END
$$
