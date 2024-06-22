DROP FUNCTION IF EXISTS hidden.group_members_of_group_read_one(
    _membership_id uuid
);

CREATE OR REPLACE FUNCTION hidden.group_members_of_group_read_one(
    _membership_id uuid
)
    RETURNS table
            (
                id_            uuid,
                group_id_      uuid,
                member_id_     uuid,
                member_type_   hidden.group_member,
                created_at_    timestamp WITH TIME ZONE,
                updated_at_    timestamp WITH TIME ZONE,
                profile_image_ text
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT
            group_members.id,
            group_members.group_id,
            group_members.member_id,
            group_members.member_type,
            group_members.created_at,
            group_members.updated_at,
            profiles.profile_image
        FROM
            hidden.group_members
            JOIN hidden.profiles
            ON group_members.member_id = profiles.id
        WHERE
            id = _membership_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group member found for membership id %', _membership_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;
