DROP POLICY IF EXISTS "Group invited members can be created by board members and presidents of involved groups."
    ON hidden.group_invited_members;
CREATE POLICY "Group invited members can be created by board members and presidents of involved groups."
    ON hidden.group_invited_members
    FOR INSERT
    TO authenticated
    WITH CHECK (
    EXISTS (
        SELECT
            1
        FROM
            hidden.group_members
        WHERE
             (
                 group_members.group_id = group_invited_members.group_id
                     AND group_members.member_id = auth.uid()
                     AND (
                     group_members.member_type = 'board_member'
                         OR
                     group_members.member_type = 'board_president'
                     ))
          OR (
                 hidden.group_invited_members.member_id = auth.uid()
                 )
    )
    );

-- TODO
DROP POLICY IF EXISTS "Group invited members are viewable by board members and presidents and the affected users."
    ON hidden.group_invited_members;
CREATE POLICY "Group invited members are viewable by board members and presidents and the affected users."
    ON hidden.group_invited_members
    FOR SELECT
    TO authenticated
    USING (
    EXISTS (
        SELECT
            1
        FROM
            hidden.group_members
        WHERE
             (
                 group_members.group_id = group_invited_members.group_id
                     AND group_members.member_id = auth.uid()
                     AND (
                     group_members.member_type = 'board_member'
                         OR
                     group_members.member_type = 'board_president'
                     ))
          OR (
                 hidden.group_invited_members.member_id = auth.uid()
                 )
    )
    );

DROP POLICY IF EXISTS "Group invited members can be updated by board members and presidents of involved groups."
    ON hidden.group_invited_members;
CREATE POLICY "Group invited members can be updated by board members and presidents of involved groups."
    ON hidden.group_invited_members
    FOR UPDATE
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Group invited members can be deleted by board members and presidents of involved groups and
affected users."
    ON hidden.group_invited_members;
CREATE POLICY "Group invited members can be deleted by board members and presidents of involved groups and
affected users."
    ON hidden.group_invited_members
    FOR DELETE
    TO authenticated
    USING (
    EXISTS (
        SELECT
            1
        FROM
            hidden.group_members
        WHERE
             (
                 group_members.group_id = group_invited_members.group_id
                     AND group_members.member_id = auth.uid()
                     AND (
                     group_members.member_type = 'board_member'
                         OR
                     group_members.member_type = 'board_president'
                     ))
          OR (
                 hidden.group_invited_members.member_id = auth.uid()
                 )
    )
    );
