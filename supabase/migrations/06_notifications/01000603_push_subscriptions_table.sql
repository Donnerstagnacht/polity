CREATE TABLE IF NOT EXISTS authenticated_access.push_subscriptions
(
    id             uuid NOT NULL,
    endpoint       text NOT NULL,
    expirationTime text NULL,
    auth           text NOT NULL,
    p256dh         text NOT NULL,
    CONSTRAINT push_subscriptions_pkey PRIMARY KEY (id),
    CONSTRAINT push_subscriptions_id_fkey FOREIGN KEY (id) REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
);

ALTER TABLE authenticated_access.push_subscriptions
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Each authenticated user can create one push subscription."
    ON authenticated_access.push_subscriptions;
CREATE POLICY "Each authenticated user can create one push subscription."
    ON authenticated_access.push_subscriptions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Each authenticated user can view its own push subscription."
    ON authenticated_access.push_subscriptions;
CREATE POLICY "Each authenticated user can view its own push subscription."
    ON authenticated_access.push_subscriptions
    FOR SELECT
    TO authenticated
    USING (
    auth.uid() = id
    );

DROP POLICY IF EXISTS "Each authenticated user can update its own push subscription."
    ON authenticated_access.push_subscriptions;
CREATE POLICY "Each authenticated user can update its own push subscription."
    ON authenticated_access.push_subscriptions
    FOR UPDATE
    TO authenticated
    USING (
    auth.uid() = id
    );
