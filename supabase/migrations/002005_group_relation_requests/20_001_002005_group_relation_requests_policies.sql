DROP POLICY IF EXISTS "Group requested relations can be created by board members and presidents of involved groups."
    ON hidden.group_requested_relations;
CREATE POLICY "Group requested relations can be created by board members and presidents of involved groups."
    ON hidden.group_requested_relations
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Group requested relations are viewable by authenticated users."
    ON hidden.group_requested_relations;
CREATE POLICY "Group requested relations are viewable by authenticated users."
    ON hidden.group_requested_relations
    FOR SELECT
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Group requested relations can be updated by board members and presidents of involved groups."
    ON hidden.group_requested_relations;
CREATE POLICY "Group requested relations can be updated by board members and presidents of involved groups."
    ON hidden.group_requested_relations
    FOR UPDATE
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Group requested relations can be deleted by board members and presidents of involved groups."
    ON hidden.group_requested_relations;
CREATE POLICY "Group requested relations can be deleted by board members and presidents of involved groups."
    ON hidden.group_requested_relations
    FOR DELETE
    TO authenticated
    USING (TRUE);
