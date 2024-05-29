DROP FUNCTION IF EXISTS hidden.increment_group_following_counter(
    group_id_in uuid)
;
CREATE OR REPLACE FUNCTION hidden.increment_group_following_counter(
    group_id_in uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    PERFORM SET_CONFIG('app.current_function', 'increment_following_counter', TRUE);
    UPDATE hidden.groups_counters
    SET
        following_counter = following_counter + 1
    WHERE
        id = group_id_in;
    PERFORM SET_CONFIG('app.current_function', NULL, TRUE);
END
$$;
