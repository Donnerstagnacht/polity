DROP FUNCTION IF EXISTS public.delete_group_member_request(
    group_id_in uuid
);

CREATE OR REPLACE FUNCTION public.delete_group_member_request(
    group_id_in uuid
)
    RETURNS table
            (
                group_id  uuid,
                member_id uuid
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id = auth.uid();
    DELETE
    FROM
        authenticated_access.group_member_requests
    WHERE
          group_id = group_id_in
      AND member_id = auth_user_id
    RETURNING
        group_id,
        member_id
        INTO
            group_id,
            member_id;
END;
$$;
