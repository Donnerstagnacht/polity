DROP FUNCTION IF EXISTS public.delete_group_member_request_by_id(
    request_id uuid
);

CREATE OR REPLACE FUNCTION public.delete_group_member_request_by_id(
    request_id uuid
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
BEGIN
    DELETE
    FROM
        authenticated_access.group_member_requests
    WHERE
        id = request_id
    RETURNING
        authenticated_access.group_member_requests.group_id,
        authenticated_access.group_member_requests.member_id
        INTO
            group_id,
            member_id;
END;
$$;
