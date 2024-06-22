CREATE POLICY "Public assistants can be followed by by everyone." ON hidden.assistants
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Public assistants are viewable by its owner." ON hidden.assistants
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Public assistants can be updated by its owner." ON hidden.assistants
    FOR UPDATE USING (auth.uid() = id);
