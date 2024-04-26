DROP FUNCTION IF EXISTS create_group_member_request(
    group_id uuid,
    member_id uuid,
    member_type group_member
);

CREATE OR REPLACE FUNCTION authenticated_access.create_group_member_request(
    group_id uuid,
    member_id uuid,
    member_type group_member
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    INSERT INTO
        authenticated_access.group_member_request
    (group_id,
     member_id,
     member_type)
    VALUES
        (group_id,
         member_id,
         member_type);
END;
$$;
