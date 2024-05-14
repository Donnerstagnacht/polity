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
    WITH CHECK (TRUE);

-- TODO
DROP POLICY IF EXISTS "Group invited members are viewable by board members and presidents and the affected users."
    ON authenticated_access.group_invited_members;
CREATE POLICY "Group invited members are viewable by board members and presidents and the affected users."
    ON authenticated_access.group_invited_members
    FOR SELECT
    TO authenticated
    USING (TRUE);

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
    USING (TRUE)
