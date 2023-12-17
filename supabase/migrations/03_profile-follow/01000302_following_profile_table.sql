CREATE TABLE IF NOT EXISTS authenticated_access.following_profiles
(
    follower  uuid NOT NULL,
    following uuid NOT NULL,
    CONSTRAINT following_profiles_pkey PRIMARY KEY (follower, following),
    CONSTRAINT following_profiles_follower_fkey FOREIGN KEY (follower)
        REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT following_profiles_following_fkey FOREIGN KEY (following)
        REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE authenticated_access.following_profiles
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public following_profiles can be followed by by everyone."
    ON authenticated_access.following_profiles;
CREATE POLICY "Public following_profiles can be followed by by everyone."
    ON authenticated_access.following_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Public following_profiles are viewable by everyone."
    ON authenticated_access.following_profiles;
CREATE POLICY "Public following_profiles are viewable by everyone."
    ON authenticated_access.following_profiles
    FOR SELECT
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Public following_profiles can be deleted by by everyone."
    ON authenticated_access.following_profiles;
CREATE POLICY "Public following_profiles can be deleted by by everyone."
    ON authenticated_access.following_profiles
    FOR DELETE
    TO authenticated
    USING (TRUE);
