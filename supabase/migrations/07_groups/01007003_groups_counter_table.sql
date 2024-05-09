DROP TABLE IF EXISTS authenticated_access.groups_counters CASCADE;
CREATE TABLE IF NOT EXISTS authenticated_access.groups_counters
(
    id                           uuid                     NOT NULL,
    follower_counter             bigint DEFAULT 0::bigint NOT NULL,
    following_counter            bigint DEFAULT 0::bigint NOT NULL,
    group_member_counter         bigint DEFAULT 0::bigint NOT NULL,
    unread_notifications_counter bigint DEFAULT 0::bigint NOT NULL,
    CONSTRAINT groups_counters_pkey PRIMARY KEY (id),
    CONSTRAINT groups_counters_id_fkey FOREIGN KEY (id) REFERENCES authenticated_access.groups (id) MATCH SIMPLE
);

ALTER TABLE authenticated_access.groups_counters
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public groups_counters can be followed by by everyone."
    ON authenticated_access.groups_counters;
CREATE POLICY "Public groups_counters can be followed by by everyone."
    ON authenticated_access.groups_counters
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Public groups_counters are viewable by everyone."
    ON authenticated_access.groups_counters;
CREATE POLICY "Public groups_counters are viewable by everyone."
    ON authenticated_access.groups_counters
    FOR SELECT
    TO authenticated
    USING (
    TRUE
    );

DROP POLICY IF EXISTS "Public groups_counters can be updated by by everyone."
    ON authenticated_access.groups_counters;
CREATE POLICY "Public groups_counters can be updated by by everyone."
    ON authenticated_access.groups_counters
    FOR UPDATE
    TO authenticated
    USING (
    TRUE
--     (CURRENT_SETTING('app.current_function') = 'decrement_follower_counter')
--         OR
--     (CURRENT_SETTING('app.current_function') = 'decrement_following_counter')
--     -- current_function = 'decrement_follower_counter'
    );

ALTER PUBLICATION supabase_realtime ADD TABLE authenticated_access.groups_counters;
