DROP POLICY IF EXISTS "Public following_groups can be followed by by everyone."
    ON hidden.following_groups;
CREATE POLICY "Public following_groups can be followed by by everyone."
    ON hidden.following_groups
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

-- DROP POLICY IF EXISTS "Followers of a group are selectable only by group admins."
--     ON hidden.following_groups;
-- CREATE POLICY "Public following_groups are viewable by everyone."
--     ON hidden.following_groups
--     FOR SELECT
--     TO authenticated
--     USING (TRUE);

DROP POLICY IF EXISTS "Users can select their own followings and admins can select a groups follower."
    ON hidden.following_groups;
CREATE POLICY "Users can select their own followings and admins can select a groups follower."
    ON hidden.following_groups
    FOR SELECT
    TO authenticated
    USING (
    EXISTS (
        SELECT
            1
        FROM
            hidden.group_members gm
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
                 hidden.following_groups.follower = auth.uid()
                 )
    ));

DROP POLICY IF EXISTS "Users can delete own followings and board members can delete groups followers."
    ON hidden.following_groups;
CREATE POLICY "Users can delete own followings and board members can delete groups followers."
    ON hidden.following_groups
    FOR DELETE
    TO authenticated
    USING (
    EXISTS (
        SELECT
            1
        FROM
            hidden.group_members gm
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
                 hidden.following_groups.follower = auth.uid()
                 )
    )
    );
