DROP POLICY IF EXISTS "Public following_groups can be followed by by everyone."
    ON authenticated_access.following_groups;
CREATE POLICY "Public following_groups can be followed by by everyone."
    ON authenticated_access.following_groups
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

-- DROP POLICY IF EXISTS "Followers of a group are selectable only by group admins."
--     ON authenticated_access.following_groups;
-- CREATE POLICY "Public following_groups are viewable by everyone."
--     ON authenticated_access.following_groups
--     FOR SELECT
--     TO authenticated
--     USING (TRUE);

DROP POLICY IF EXISTS "Users can select their own followings and admins can select a groups follower."
    ON authenticated_access.following_groups;
CREATE POLICY "Users can select their own followings and admins can select a groups follower."
    ON authenticated_access.following_groups
    FOR SELECT
    TO authenticated
    USING (
    EXISTS (
        SELECT
            1
        FROM
            authenticated_access.group_members gm
        WHERE
             (
                 gm.group_id = following_groups.following
                     AND gm.member_id = auth.uid()
                     AND (
                     gm.member_type = 'board_member'
                         OR
                     gm.member_type = 'board_president'
                     )
                 )
          OR (
                 authenticated_access.following_groups.follower = auth.uid()
                 )
    ));

DROP POLICY IF EXISTS "Users can delete own followings and board members can delete groups followers."
    ON authenticated_access.following_groups;
CREATE POLICY "Users can delete own followings and board members can delete groups followers."
    ON authenticated_access.following_groups
    FOR DELETE
    TO authenticated
    USING (
    EXISTS (
        SELECT
            1
        FROM
            authenticated_access.group_members gm
        WHERE
             (
                 gm.group_id = following_groups.following
                     AND gm.member_id = auth.uid()
                     AND (
                     gm.member_type = 'board_member'
                         OR
                     gm.member_type = 'board_president'
                     ))
          OR (
                 authenticated_access.following_groups.follower = auth.uid()
                 )
    )
    );
