DROP FUNCTION IF EXISTS authenticated.group_member_requests_create(
    _group_id uuid
);

CREATE OR REPLACE FUNCTION authenticated.group_member_requests_create(
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
