DROP POLICY IF EXISTS "Public groups_counters can be followed by by everyone."
    ON hidden.groups_counters;
CREATE POLICY "Public groups_counters can be followed by by everyone."
    ON hidden.groups_counters
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Public groups_counters are viewable by everyone."
    ON hidden.groups_counters;
CREATE POLICY "Public groups_counters are viewable by everyone."
    ON hidden.groups_counters
    FOR SELECT
    TO authenticated
    USING (
    TRUE
    );

DROP POLICY IF EXISTS "Public groups_counters can be updated by by everyone."
    ON hidden.groups_counters;
CREATE POLICY "Public groups_counters can be updated by by everyone."
    ON hidden.groups_counters
    FOR UPDATE
    TO authenticated
    USING (
    TRUE
--     (CURRENT_SETTING('app.current_function') = 'decrement_follower_counter')
--         OR
--     (CURRENT_SETTING('app.current_function') = 'decrement_following_counter')
--     -- current_function = 'decrement_follower_counter'
    );

