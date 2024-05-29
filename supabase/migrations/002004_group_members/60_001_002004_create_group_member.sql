DROP FUNCTION IF EXISTS hidden.create_group_member(
    _group_id uuid,
    _member_id uuid,
    _member_type group_member
);

CREATE OR REPLACE FUNCTION hidden.create_group_member(
    _group_id uuid,
    _member_id uuid,
    _member_type group_member
)
    RETURNS membership
    LANGUAGE plpgsql
AS
$$
DECLARE
    membership membership;
BEGIN
    INSERT INTO
        hidden.group_members (group_id,
                              member_id,
                              member_type)
    VALUES
        (_group_id,
         _member_id,
         _member_type)
    RETURNING
        id,
        group_id,
        member_id
        INTO
            membership.id,
            membership.group_id,
            membership.member_id;
    RETURN membership;
END
$$;
