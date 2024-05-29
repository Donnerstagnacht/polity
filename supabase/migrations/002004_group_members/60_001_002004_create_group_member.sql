DROP FUNCTION IF EXISTS hidden.create_group_member(
    group_id_in uuid,
    member_id_in uuid,
    member_type_in group_member
);

CREATE OR REPLACE FUNCTION hidden.create_group_member(
    group_id_in uuid,
    member_id_in uuid,
    member_type_in group_member
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
        (group_id_in,
         member_id_in,
         member_type_in)
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
