DROP FUNCTION IF EXISTS authenticated_access.read_group_relations(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.read_group_relations(
    group_id_in uuid
)
    RETURNS table
            (
                id                    uuid,
                group_id              text,
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
    SELECT *
    FROM
        authenticated_access.group_relations
    WHERE
        authenticated_access.group_relations.group_id = group_id_in;
END
$$;
