DROP FUNCTION IF EXISTS public.check_group_membership_status(
    group_id_in uuid
);
CREATE OR REPLACE FUNCTION public.check_group_membership_status(
    group_id_in uuid
)
    RETURNS table
            (
                id          uuid,
                group_id    uuid,
                member_id   uuid,
                member_type group_member,
                created_at  timestamp WITH TIME ZONE,
                updated_at  timestamp WITH TIME ZONE
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id = auth.uid();
    RETURN QUERY
        SELECT
            1
        FROM
            authenticated_access.group_members
        WHERE
              group_id = group_id_in
          AND member_id = auth_user_id
          AND (member_type = 'member' OR member_type = 'board_member');
END;
$$;
