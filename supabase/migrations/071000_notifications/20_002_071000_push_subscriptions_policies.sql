DROP POLICY IF EXISTS "Each authenticated user can create one push subscription."
    ON hidden.push_subscriptions;
CREATE POLICY "Each authenticated user can create one push subscription."
    ON hidden.push_subscriptions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Each authenticated user can view its own push subscription."
    ON hidden.push_subscriptions;
CREATE POLICY "Each authenticated user can view its own push subscription."
    ON hidden.push_subscriptions
    FOR SELECT
    TO authenticated
    USING (
    auth.uid() = id
    );

DROP POLICY IF EXISTS "Each authenticated user can update its own push subscription."
    ON hidden.push_subscriptions;
CREATE POLICY "Each authenticated user can update its own push subscription."
    ON hidden.push_subscriptions
    FOR UPDATE
    TO authenticated
    USING (
    auth.uid() = id
    );
