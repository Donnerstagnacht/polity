DROP FUNCTION IF EXISTS public.delete_group_member_request(
    _group uuid
);

CREATE OR REPLACE FUNCTION public.delete_group_member_request(
    _group_id uuid
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
          group_id = _group_id
      AND member_id = auth_user_id
    RETURNING
        id,
        group_id,
        member_id
        INTO
            membership.id,
            membership.group_id,
            membership.member_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member request found for group id % and user id %', _group_id, auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
    RETURN membership;
END;
$$;
