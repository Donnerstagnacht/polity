DROP FUNCTION IF EXISTS hidden.group_relations_read(
    _group_relation_id uuid
);

CREATE OR REPLACE FUNCTION hidden.group_relations_read(
    _group_relation_id uuid
)
    RETURNS table
            (
                id_                    uuid,
                group_id_              uuid,
                related_group_id_      uuid,
                relation_type_         hidden.group_relation,
                created_at_            timestamp WITH TIME ZONE,
                updated_at_            timestamp WITH TIME ZONE,
                right_to_inform_       boolean,
                right_to_speak_        boolean,
                right_to_amend_        boolean,
                right_to_vote_active_  boolean,
                right_to_vote_passive_ boolean
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT *
        FROM
            hidden.group_relations
        WHERE
            id = _group_relation_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group relation found for id %', _group_relation_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;

