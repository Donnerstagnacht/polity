CREATE POLICY "Public assistants can be followed by by everyone." ON authenticated_access.assistants
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Public assistants are viewable by its owner." ON authenticated_access.assistants
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Public assistants can be updated by its owner." ON authenticated_access.assistants
    FOR UPDATE USING (auth.uid() = id);
