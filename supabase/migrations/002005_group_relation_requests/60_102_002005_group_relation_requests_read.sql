DROP FUNCTION IF EXISTS hidden.group_relation_requests_read(
    _group_id uuid
);

CREATE OR REPLACE FUNCTION hidden.group_relation_requests_read(
    _group_id uuid
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
            hidden.group_requested_relations
        WHERE
            group_id = _group_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group relation requests found for group id %', _group_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
