DROP TABLE IF EXISTS authenticated_access.group_members CASCADE;
CREATE TABLE IF NOT EXISTS authenticated_access.group_members
(
    id          uuid                                   NOT NULL DEFAULT uuid_generate_v4(),
    group_id    uuid                                   NOT NULL,
    member_id   uuid                                   NOT NULL,
    member_type group_member,
    created_at  timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at  timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT group_member_pkey PRIMARY KEY (id),
    CONSTRAINT group_member_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES authenticated_access.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT group_member_member_id_fkey FOREIGN KEY (member_id)
        REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE authenticated_access.group_members
    ENABLE ROW LEVEL SECURITY;

DROP VIEW IF EXISTS memberships_of_authenticated_user CASCADE;
CREATE OR REPLACE VIEW memberships_of_authenticated_user AS
SELECT *
FROM
    authenticated_access.group_members AS m
WHERE
    auth.uid() = m.member_id;

DROP VIEW IF EXISTS board_memberships_of_authenticated_user CASCADE;
CREATE OR REPLACE VIEW board_memberships_of_authenticated_user AS
SELECT *
FROM
    authenticated_access.group_members AS m
WHERE
      auth.uid() = m.member_id
  AND (
          m.member_type = 'board_member'
              OR
          m.member_type = 'board_president'
          );

DROP POLICY IF EXISTS "Group members can be created by board members and presidents of involved groups."
    ON authenticated_access.group_members;
CREATE POLICY "Group members can be created by board members and presidents of involved groups."
    ON authenticated_access.group_members
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

--TODO
DROP POLICY IF EXISTS "Group members are viewable by a groups members."
    ON authenticated_access.group_members;
CREATE POLICY "Group members are viewable by a groups members."
    ON authenticated_access.group_members
    FOR SELECT
    TO authenticated
    USING (
    EXISTS (
        SELECT
            1
        FROM
            memberships_of_authenticated_user AS m
        WHERE
            -- allows access to all rows which have a group_id included in the my_membership view
            authenticated_access.group_members.group_id = m.group_id
    ));



DROP POLICY IF EXISTS "Group members can be updated by board members and presidents of involved groups."
    ON authenticated_access.group_members;
CREATE POLICY "Group members can be updated by board members and presidents of involved groups."
    ON authenticated_access.group_members
    FOR UPDATE
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Group members can be deleted by board members and presidents of involved groups or the user
itself."
    ON authenticated_access.group_members;
CREATE POLICY "Group members can be deleted by board members and presidents of involved groups or the user
itself."
    ON authenticated_access.group_members
    FOR DELETE
    TO authenticated
    USING (
    EXISTS (
        SELECT
            1
        FROM
            board_memberships_of_authenticated_user AS bm
        WHERE
            -- allows access to all rows which have a group_id included in the board_membership view
            authenticated_access.group_members.group_id = bm.group_id
        UNION
        SELECT
            1
        FROM
            memberships_of_authenticated_user AS m
        WHERE
            m.member_id = auth.uid()
    )
    );
