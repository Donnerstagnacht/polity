-- DROP POLICY IF EXISTS "Public groups_counters can be followed by by everyone."
--     ON hidden.groups_counters;
-- CREATE POLICY "Public groups_counters can be followed by by everyone."
--     ON hidden.groups_counters
--     FOR INSERT
--     TO authenticated
--     WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Users can read every group counter." ON hidden.groups_counters;
CREATE POLICY "Users can read every group counter."
    ON hidden.groups_counters
    FOR SELECT
    TO authenticated
    USING (
    TRUE
    );

DROP POLICY IF EXISTS "Users can update every group counter." ON hidden.groups_counters;
CREATE POLICY "Users can update every group counter."
    ON hidden.groups_counters
    FOR UPDATE
    TO authenticated
    USING (
    TRUE
    );

