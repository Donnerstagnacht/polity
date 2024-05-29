DROP FUNCTION IF EXISTS hidden.read_group_member(uuid);

CREATE OR REPLACE FUNCTION hidden.read_group_member(
    membership_id uuid
)
    RETURNS table
            (
                id          uuid,
                group_id    uuid,
                member_id   uuid,
                member_type group_member,
                created_at  timestamp WITH TIME ZONE,
                updated_at  timestamp WITH TIME ZONE
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT *
        FROM
            group_members
        WHERE
            id = hidden.membership_id;
END;
$$;
