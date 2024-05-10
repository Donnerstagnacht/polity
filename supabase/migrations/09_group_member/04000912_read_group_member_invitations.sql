DROP FUNCTION IF EXISTS public.read_group_member_invitations(uuid);

CREATE OR REPLACE FUNCTION public.read_group_member_invitations(
    group_id uuid
)
    RETURNS table
            (
                id          uuid,
                group_id_in uuid,
                member_id   uuid,
                member_type group_member,
                created_at  timestamp WITH TIME ZONE,
                updated_at  timestamp WITH TIME ZONE
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT *
        FROM
            authenticated_access.group_member_invitations
        WHERE
            group_id = group_id_in;
END;
$$;
