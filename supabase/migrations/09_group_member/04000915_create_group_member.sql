DROP FUNCTION IF EXISTS authenticated_access.create_group_member(
    group_id uuid,
    member_id uuid,
    member_type group_member
);

CREATE OR REPLACE FUNCTION authenticated_access.create_group_member(
    group_id uuid,
    member_id uuid,
    member_type group_member
)
    RETURNS membership
    LANGUAGE plpgsql
AS
$$
DECLARE
    membership membership;
BEGIN
    INSERT INTO
        authenticated_access.group_members (group_id,
                                            member_id,
                                            member_type)
    VALUES
        (group_id,
         member_id,
         member_type)
    RETURNING
        id,
        group_id,
        member_type
        INTO
            membership.id,
            membership.group_id,
            membership.member_id;
    RETURN membership;
END
$$;
