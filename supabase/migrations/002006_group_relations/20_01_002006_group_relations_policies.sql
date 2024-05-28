DROP POLICY IF EXISTS "Group relations can be created by board members and presidents of involved groups."
    ON authenticated_access.group_relations;
CREATE POLICY "Group relations can be created by board members and presidents of involved groups."
    ON authenticated_access.group_relations
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Group relations are viewable by authenticated users."
    ON authenticated_access.group_relations;
CREATE POLICY "Group relations are viewable by authenticated users."
    ON authenticated_access.group_relations
    FOR SELECT
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Group relations can be updated by board members and presidents of involved groups."
    ON authenticated_access.group_relations;
CREATE POLICY "Group relations can be updated by board members and presidents of involved groups."
    ON authenticated_access.group_relations
    FOR UPDATE
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Group relations can be deleted by board members and presidents of involved groups."
    ON authenticated_access.group_relations;
CREATE POLICY "Group relations can be deleted by board members and presidents of involved groups."
    ON authenticated_access.group_relations
    FOR DELETE
    TO authenticated
    USING (TRUE);
