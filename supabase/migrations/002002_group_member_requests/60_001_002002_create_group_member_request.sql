DROP FUNCTION IF EXISTS public.create_group_member_request(
    _group_id uuid
);

CREATE OR REPLACE FUNCTION public.create_group_member_request(
    _group_id uuid
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
        hidden.group_member_requests
    (group_id,
     member_id,
     member_type)
    VALUES
        (_group_id,
         auth_user_id,
         'member');
END;
$$;
