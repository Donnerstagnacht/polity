DROP FUNCTION IF EXISTS public.delete_group_member_request_by_id(
    request_id uuid
);

CREATE OR REPLACE FUNCTION public.delete_group_member_request_by_id(
    request_id uuid
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
        hidden.group_member_requests.id = request_id
    RETURNING
        hidden.group_member_requests.id,
        hidden.group_member_requests.group_id,
        hidden.group_member_requests.member_id
        INTO
            membership.id,
            membership.group_id,
            membership.member_id;
    RETURN membership;
END;
$$;
