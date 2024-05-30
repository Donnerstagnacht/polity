DROP POLICY IF EXISTS "Group member requests can be created by authenticated users who are not members of the group."
    ON hidden.group_member_requests;
CREATE POLICY "Group member requests can be created by authenticated users who are not members of the group."
    ON hidden.group_member_requests
    FOR INSERT
    TO authenticated
    WITH CHECK (
    TRUE
--     NOT EXISTS (
--         SELECT
--             1
--         FROM
--             hidden.group_members
--         WHERE
--               group_members.group_id = group_member_requests.group_id
--           AND group_members.member_id = group_member_requests.member_id
--     )
    );

DROP POLICY IF EXISTS "Group member requests can be viewed board members and presidents of involved groups and by
affected users."
    ON hidden.group_member_requests;
CREATE POLICY "Group member requests can be viewed board members and presidents of involved groups and by
affected users."
    ON hidden.group_member_requests
    FOR SELECT
    TO authenticated
    USING (
    TRUE
--     EXISTS (
--         SELECT
--             1
--         FROM
--             hidden.group_members
--         WHERE
--              (
--                  group_members.group_id = group_member_requests.group_id
--                      AND group_members.member_id = auth.uid()
--                      AND (
--                      group_members.member_type = 'board_member'
--                          OR
--                      group_members.member_type = 'board_president'
--                      ))
--           OR (
--                  hidden.group_member_requests.member_id = auth.uid()
--                  )
--     )
    );

DROP POLICY IF EXISTS "Group member requests can be updated by board members and presidents of involved groups."
    ON hidden.group_member_requests;
CREATE POLICY "Group member requests can be updated by board members and presidents of involved groups."
    ON hidden.group_member_requests
    FOR UPDATE
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Group member requests can be deleted by board members and presidents of involved groups and
affected users."
    ON hidden.group_member_requests;
CREATE POLICY "Group member requests can be deleted by board members and presidents of involved groups and
affected users."
    ON hidden.group_member_requests
    FOR DELETE
    TO authenticated
    USING (
    TRUE
--     EXISTS (
--         SELECT
--             1
--         FROM
--             hidden.group_members
--         WHERE
--             (
--                 group_members.group_id = group_member_requests.group_id
--                     AND group_members.member_id = auth.uid()
--                     AND (
--                     group_members.member_type = 'board_member'
--                         OR
--                     group_members.member_type = 'board_president'
--                     ))
--     ) OR (
--         hidden.group_member_requests.member_id = auth.uid()
--         )
    );
