DROP POLICY IF EXISTS "Public groups can be created by by authenticated users."
    ON authenticated_access.groups;
CREATE POLICY "Public groups can be created by by authenticated users."
    ON authenticated_access.groups
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Public groups are viewable by everyone."
    ON authenticated_access.groups;
CREATE POLICY "Public groups are viewable by everyone."
    ON authenticated_access.groups
    FOR SELECT
    USING (TRUE);

-- TODO
DROP POLICY IF EXISTS "Public groups can be updated by board members and presidents."
    ON authenticated_access.groups;
CREATE POLICY "Public groups can be updated by board members and presidents."
    ON authenticated_access.groups
    FOR UPDATE
    TO authenticated
    USING (TRUE);
