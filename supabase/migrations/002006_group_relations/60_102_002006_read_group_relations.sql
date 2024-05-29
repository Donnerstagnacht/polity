DROP FUNCTION IF EXISTS hidden.read_group_relations(
    _group_id uuid
);

CREATE OR REPLACE FUNCTION hidden.read_group_relations(
    _group_id uuid
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
        hidden.group_relations
    WHERE
        group_id = _group_id;
END
$$;
