-- TODO
DROP POLICY IF EXISTS "Meetings can be created by authenticated users which are members of the associated group."
    ON authenticated_access.meetings;
CREATE POLICY "Meetings can be created by authenticated users which are members of the associated group."
    ON authenticated_access.meetings
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Meetings can be viewed by authenticated users."
    ON authenticated_access.meetings;
CREATE POLICY "Meetings can be viewed by authenticated users."
    ON authenticated_access.meetings
    FOR SELECT
    TO authenticated
    USING (TRUE);

-- TODO
DROP POLICY IF EXISTS "Meetings can be updated by creators and board members and presidents of the associated group."
    ON authenticated_access.meetings;
CREATE POLICY "Meetings can be updated by creators and board members and presidents of the associated group."
    ON authenticated_access.meetings
    FOR UPDATE
    TO authenticated
    USING (TRUE);

-- TODO
DROP POLICY IF EXISTS "Meetings can be deleted by creators and board members and presidents of the associated group."
    ON authenticated_access.meetings;
CREATE POLICY "Meetings can be deleted by creators and board members and presidents of the associated group."
    ON authenticated_access.meetings
    FOR DELETE
    TO authenticated
    USING (TRUE);

