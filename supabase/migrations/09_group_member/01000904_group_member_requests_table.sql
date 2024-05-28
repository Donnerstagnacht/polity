CREATE TABLE IF NOT EXISTS authenticated_access.group_member_requests
(
    id          uuid                                   NOT NULL DEFAULT uuid_generate_v4(),
    group_id    uuid                                   NOT NULL,
    member_id   uuid                                   NOT NULL,
    member_type group_member,
    created_at  timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at  timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT group_member_request_pkey PRIMARY KEY (id),
    CONSTRAINT group_member_request_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES authenticated_access.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT group_member_request_member_id_fkey FOREIGN KEY (member_id)
        REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE authenticated_access.group_member_requests
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Group member requests can be created by authenticated users who are not members of the group."
    ON authenticated_access.group_member_requests;
CREATE POLICY "Group member requests can be created by authenticated users who are not members of the group."
    ON authenticated_access.group_member_requests
    FOR INSERT
    TO authenticated
    WITH CHECK (
    NOT EXISTS (
        SELECT
            1
        FROM
            authenticated_access.group_members
        WHERE
              group_members.group_id = group_member_requests.group_id
          AND group_members.member_id = group_member_requests.member_id
    )
    );

DROP POLICY IF EXISTS "Group member requests can be viewed board members and presidents of involved groups and by
affected users."
    ON authenticated_access.group_member_requests;
CREATE POLICY "Group member requests can be viewed board members and presidents of involved groups and by
affected users."
    ON authenticated_access.group_member_requests
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
                 group_members.group_id = group_member_requests.group_id
                     AND group_members.member_id = auth.uid()
                     AND (
                     group_members.member_type = 'board_member'
                         OR
                     group_members.member_type = 'board_president'
                     ))
          OR (
                 authenticated_access.group_member_requests.member_id = auth.uid()
                 )
    )
    );

DROP POLICY IF EXISTS "Group member requests can be updated by board members and presidents of involved groups."
    ON authenticated_access.group_member_requests;
CREATE POLICY "Group member requests can be updated by board members and presidents of involved groups."
    ON authenticated_access.group_member_requests
    FOR UPDATE
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Group member requests can be deleted by board members and presidents of involved groups and
affected users."
    ON authenticated_access.group_member_requests;
CREATE POLICY "Group member requests can be deleted by board members and presidents of involved groups and
affected users."
    ON authenticated_access.group_member_requests
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
                group_members.group_id = group_member_requests.group_id
                    AND group_members.member_id = auth.uid()
                    AND (
                    group_members.member_type = 'board_member'
                        OR
                    group_members.member_type = 'board_president'
                    ))
    ) OR (
        authenticated_access.group_member_requests.member_id = auth.uid()
        )
    );
