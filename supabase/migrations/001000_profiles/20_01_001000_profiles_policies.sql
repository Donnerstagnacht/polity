CREATE POLICY "Users can insert their own profile." ON authenticated_access.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone." ON authenticated_access.profiles
    FOR SELECT USING (TRUE);

CREATE POLICY "Users can update own profile." ON authenticated_access.profiles
    FOR UPDATE USING (auth.uid() = id);
