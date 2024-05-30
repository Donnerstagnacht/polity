DROP FUNCTION IF EXISTS authenticated.check_group_membership_status(
    _group_id uuid
);

CREATE OR REPLACE FUNCTION authenticated.check_group_membership_status(
    _group_id uuid
)
    RETURNS text
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id       uuid;
    member_type_return text := 'no_member'; -- Default value as 'requested'
BEGIN
    auth_user_id := auth.uid();

    -- Use a variable to hold the result of the query
    SELECT
        COALESCE(
            (
                SELECT
                    'member'
                FROM
                    hidden.group_members
                WHERE
                      group_id = _group_id
                  AND member_id = auth_user_id
                  AND member_type IN ('member')
                LIMIT 1
            ),
            (
                SELECT
                    'board_member'
                FROM
                    hidden.group_members
                WHERE
                      group_id = _group_id
                  AND member_id = auth_user_id
                  AND member_type IN ('board_member', 'board_president')
                LIMIT 1
            ),
            (
                SELECT
                    'requested'
                FROM
                    hidden.group_member_requests
                WHERE
                      group_id = _group_id
                  AND member_id = auth_user_id
                LIMIT 1
            ),
            (
                SELECT
                    'invited'
                FROM
                    hidden.group_invited_members
                WHERE
                      group_id = _group_id
                  AND member_id = auth_user_id
                LIMIT 1
            ),
            'no_member'
        )
    INTO member_type_return;

    -- Return the determined membership type
    RETURN member_type_return;
END;
$$;
