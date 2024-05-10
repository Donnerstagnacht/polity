DROP FUNCTION IF EXISTS public.create_group_member_request(
    group_id_in uuid
);

CREATE OR REPLACE FUNCTION public.create_group_member_request(
    group_id_in uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id = auth.uid();
    INSERT INTO
        authenticated_access.group_member_requests
    (group_id,
     member_id,
     member_type)
    VALUES
        (group_id_in,
         auth_user_id,
         'member');
END;
$$;
