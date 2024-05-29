DROP FUNCTION IF EXISTS authenticated_access.decrement_profile_group_membership_counter(user_id uuid);
CREATE OR REPLACE FUNCTION authenticated_access.decrement_profile_group_membership_counter(user_id uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM SET_CONFIG('app.current_function', 'decrement_profile_group_membership_counter', TRUE);
    UPDATE authenticated_access.profiles_counters
    SET
        group_membership_counter = group_membership_counter - 1
    WHERE
        id = user_id;
    PERFORM SET_CONFIG('app.current_function', NULL, TRUE);
END;
$$;
