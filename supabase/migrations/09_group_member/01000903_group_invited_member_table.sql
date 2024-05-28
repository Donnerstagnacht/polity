CREATE TABLE IF NOT EXISTS authenticated_access.group_invited_members
(
    id          uuid                                   NOT NULL DEFAULT uuid_generate_v4(),
    group_id    uuid                                   NOT NULL,
    member_id   uuid                                   NOT NULL,
    member_type group_member,
    created_at  timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at  timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT group_invited_member_pkey PRIMARY KEY (id),
    CONSTRAINT group_invited_member_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES authenticated_access.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT group_invited_member_member_id_fkey FOREIGN KEY (member_id)
        REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE authenticated_access.group_invited_members
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Group invited members can be created by board members and presidents of involved groups."
    ON authenticated_access.group_invited_members;
CREATE POLICY "Group invited members can be created by board members and presidents of involved groups."
    ON authenticated_access.group_invited_members
    FOR INSERT
    TO authenticated
    WITH CHECK (
    EXISTS (
        SELECT
            1
        FROM
            authenticated_access.group_members
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
                 authenticated_access.group_invited_members.member_id = auth.uid()
                 )
    )
    );

-- TODO
DROP POLICY IF EXISTS "Group invited members are viewable by board members and presidents and the affected users."
    ON authenticated_access.group_invited_members;
CREATE POLICY "Group invited members are viewable by board members and presidents and the affected users."
    ON authenticated_access.group_invited_members
    FOR SELECT
    TO authenticated
    USING (
    EXISTS (
        SELECT
            1
        FROM
            authenticated_access.group_members
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
                 authenticated_access.group_invited_members.member_id = auth.uid()
                 )
    )
    );

DROP POLICY IF EXISTS "Group invited members can be updated by board members and presidents of involved groups."
    ON authenticated_access.group_invited_members;
CREATE POLICY "Group invited members can be updated by board members and presidents of involved groups."
    ON authenticated_access.group_invited_members
    FOR UPDATE
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Group invited members can be deleted by board members and presidents of involved groups and
affected users."
    ON authenticated_access.group_invited_members;
CREATE POLICY "Group invited members can be deleted by board members and presidents of involved groups and
affected users."
    ON authenticated_access.group_invited_members
    FOR DELETE
    TO authenticated
    USING (
    EXISTS (
        SELECT
            1
        FROM
            authenticated_access.group_members
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
                 authenticated_access.group_invited_members.member_id = auth.uid()
                 )
    )
    );
