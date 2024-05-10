DROP FUNCTION IF EXISTS authenticated_access.increment_group_member_counter(
    group_id uuid
);
CREATE OR REPLACE FUNCTION authenticated_access.increment_group_member_counter(
    group_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM SET_CONFIG('app.current_function', 'increment_group_member_counter', TRUE);
    UPDATE authenticated_access.groups_counters
    SET
        group_member_counter = group_member_counter + 1
    WHERE
        id = group_id;
    PERFORM SET_CONFIG('app.current_function', NULL, TRUE);

END
$$;

DROP FUNCTION IF EXISTS authenticated_access.decrement_group_member_counter(group_id uuid);
CREATE OR REPLACE FUNCTION authenticated_access.decrement_group_member_counter(group_id uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM SET_CONFIG('app.current_function', 'decrement_group_member_counter', TRUE);
    UPDATE authenticated_access.groups_counters
    SET
        group_member_counter = group_member_counter - 1
    WHERE
        id = group_id;
    PERFORM SET_CONFIG('app.current_function', NULL, TRUE);
END;
$$;
