CREATE POLICY "Users can insert their own profile." ON hidden.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone." ON hidden.profiles
    FOR SELECT USING (TRUE);

CREATE POLICY "Users can update own profile." ON hidden.profiles
    FOR UPDATE USING (auth.uid() = id);
