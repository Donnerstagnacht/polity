DROP POLICY IF EXISTS "Users can read every profile counter." ON hidden.profiles_counters;
CREATE POLICY "Users can read every profile counter."
    ON hidden.profiles_counters
    FOR SELECT
    TO authenticated
    USING (
    TRUE
    );

DROP POLICY IF EXISTS "Users an update every profile counter." ON hidden.profiles_counters;
CREATE POLICY "Users an update every profile counter."
    ON hidden.profiles_counters
    FOR UPDATE
    TO authenticated
    USING (
    TRUE
    );
