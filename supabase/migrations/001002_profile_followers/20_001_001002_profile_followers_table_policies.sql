DROP POLICY IF EXISTS "Users can follow other users." ON hidden.following_profiles;
CREATE POLICY "Users can follow other users."
    ON hidden.following_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (
    follower = auth.uid()
    );

DROP POLICY IF EXISTS "Users can read their followers." ON hidden.following_profiles;
CREATE POLICY "Users can read their followers."
    ON hidden.following_profiles
    FOR SELECT
    TO authenticated
    USING (
    following = auth.uid()
    );

DROP POLICY IF EXISTS "Users can read their followings." ON hidden.following_profiles;
CREATE POLICY "Users can read their followings."
    ON hidden.following_profiles
    FOR SELECT
    TO authenticated
    USING (
    follower = auth.uid()
    );


DROP POLICY IF EXISTS "Users can delete their own followers."
    ON hidden.following_profiles;
CREATE POLICY "Users can delete their own followers."
    ON hidden.following_profiles
    FOR DELETE
    TO authenticated
    USING (
    following = auth.uid()
    );

DROP POLICY IF EXISTS "Users can delete their own followings."
    ON hidden.following_profiles;
CREATE POLICY "Users can delete their own followings."
    ON hidden.following_profiles
    FOR DELETE
    TO authenticated
    USING (
    follower = auth.uid()
    );
