DROP FUNCTION IF EXISTS public.delete_group_member_request_by_id(
    _request_id uuid
);

CREATE OR REPLACE FUNCTION public.delete_group_member_request_by_id(
    _request_id uuid
)
    RETURNS membership
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    membership membership;
BEGIN
    DELETE
    FROM
        hidden.group_member_requests
    WHERE
        id = _request_id
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
