CREATE TABLE IF NOT EXISTS authenticated_access.following_groups
(
    follower  uuid NOT NULL,
    following uuid NOT NULL,
    CONSTRAINT following_groups_pkey PRIMARY KEY (follower, following),
    CONSTRAINT following_groups_follower_fkey FOREIGN KEY (follower)
        REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT following_groups_following_fkey FOREIGN KEY (following)
        REFERENCES authenticated_access.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE authenticated_access.following_groups
    ENABLE ROW LEVEL SECURITY;

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
