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
