DROP VIEW IF EXISTS board_memberships_of_authenticated_user CASCADE;
CREATE OR REPLACE VIEW board_memberships_of_authenticated_user AS
SELECT *
FROM
    hidden.group_members AS m
WHERE
      auth.uid() = m.member_id
  AND (
          m.member_type = 'board_member'
              OR
          m.member_type = 'board_president'
          );


DROP POLICY IF EXISTS "Users can create groups." ON hidden.groups;
CREATE POLICY "Users can create groups."
    ON hidden.groups
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Users can read groups." ON hidden.groups;
CREATE POLICY "Users can read groups."
    ON hidden.groups
    FOR SELECT
    USING (TRUE);

-- TODO
DROP POLICY IF EXISTS "Board members and presidents can update groups."
    ON hidden.groups;
CREATE POLICY "Board members and presidents can update groups."
    ON hidden.groups
    FOR UPDATE
    TO authenticated
    USING (
    EXISTS (
        SELECT
            1
        FROM
            board_memberships_of_authenticated_user AS bm
        WHERE
            bm.group_id = id
    ));
