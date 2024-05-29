DROP POLICY IF EXISTS "Public following_profiles can be followed by by everyone."
    ON hidden.following_profiles;
CREATE POLICY "Public following_profiles can be followed by by everyone."
    ON hidden.following_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Public following_profiles are viewable by everyone."
    ON hidden.following_profiles;
CREATE POLICY "Public following_profiles are viewable by everyone."
    ON hidden.following_profiles
    FOR SELECT
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Public following_profiles can be deleted by by everyone."
    ON hidden.following_profiles;
CREATE POLICY "Public following_profiles can be deleted by by everyone."
    ON hidden.following_profiles
    FOR DELETE
    TO authenticated
    USING (TRUE);
