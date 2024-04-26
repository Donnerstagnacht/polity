DROP FUNCTION IF EXISTS authenticated_access.create_group_member_invitation(
    group_id uuid,
    member_id uuid,
    member_type group_member
);

CREATE OR REPLACE FUNCTION authenticated_access.create_group_member_invitation(
    group_id uuid,
    member_id uuid,
    member_type group_member
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
BEGIN
    INSERT INTO
        authenticated_access.group_invited_members(group_id,
                                                   member_id,
                                                   member_type)
    VALUES
        (group_id,
         member_id,
         member_type);
END;
$$;
