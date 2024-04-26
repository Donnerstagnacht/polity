DROP FUNCTION IF EXISTS authenticated_access.read_group_requested_relation(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.read_group_requested_relation(
    group_relation_id uuid
)
    RETURNS table
            (
                id                    uuid,
                group_id              uuid,
                related_group_id      uuid,
                relation_type         group_relation,
                created_at            timestamp WITH TIME ZONE,
                updated_at            timestamp WITH TIME ZONE,
                right_to_inform       boolean,
                right_to_speak        boolean,
                right_to_amend        boolean,
                right_to_vote_active  boolean,
                right_to_vote_passive boolean
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT
            id,
            group_id,
            related_group_id,
            relation_type,
            created_at,
            updated_at,
            right_to_inform,
            right_to_speak,
            right_to_amend,
            right_to_vote_active,
            right_to_vote_passive
        FROM
            authenticated_access.group_relation
        WHERE
            id = group_relation_id;
END
$$;