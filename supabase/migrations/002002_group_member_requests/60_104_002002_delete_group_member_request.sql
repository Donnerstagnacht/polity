DROP FUNCTION IF EXISTS public.delete_group_member_request(
    group_id_in uuid
);

CREATE OR REPLACE FUNCTION public.delete_group_member_request(
    group_id_in uuid
)
    RETURNS membership
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
    membership   membership;
BEGIN
    auth_user_id = auth.uid();
    DELETE
    FROM
        hidden.group_member_requests
    WHERE
          group_id = group_id_in
      AND member_id = auth_user_id
    RETURNING
        id,
        group_id,
        member_id
        INTO
            membership.id,
            membership.group_id,
            membership.member_id;
    RETURN membership;
END;
$$;
