DROP FUNCTION IF EXISTS public.check_group_membership_status(
    group_id_in uuid
);

CREATE OR REPLACE FUNCTION public.check_group_membership_status(
    group_id_in uuid
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
                      group_id = group_id_in
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
                      group_id = group_id_in
                  AND member_id = auth_user_id
                  AND member_type IN ('board_member', 'board_president')
                LIMIT 1
            ),
            (
                SELECT
                    'requested'
                FROM
                    hidden.read_group_member_request(
                        group_id_in,
                        auth_user_id
                    )
                --if row returned, return 'requested' instead of the row,
            ),
            (
                SELECT
                    'invited'
                FROM
                    hidden.read_group_member_invitation(
                        group_id_in,
                        auth_user_id
                    )
                --if row returned, return 'invited' instead of the row,
            ),
            'no_member'
        )
    INTO member_type_return;

    -- Return the determined membership type
    RETURN member_type_return;
END;
$$;
