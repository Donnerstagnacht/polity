DROP POLICY IF EXISTS "Users can view every profile." ON hidden.profiles;
CREATE POLICY "Users can view every profile."
    ON hidden.profiles
    FOR SELECT
    TO authenticated
    USING (
    TRUE
    );

DROP POLICY IF EXISTS "Users can update their own profile." ON hidden.profiles;
CREATE POLICY "Users can update their own profile."
    ON hidden.profiles
    FOR UPDATE
    TO authenticated
    USING (
    auth.uid() = id
    );
