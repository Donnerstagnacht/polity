DROP FUNCTION IF EXISTS hidden.accept_group_relation_request_transaction(
    _group_relation_request_id uuid,
    _group_id uuid
);

CREATE OR REPLACE FUNCTION hidden.accept_group_relation_request_transaction(
    _group_relation_request_id uuid,
    _group_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    req_record record;
BEGIN
    SELECT *
    FROM
        hidden.group_relation_requests_delete(
            _group_relation_request_id
        )
    INTO req_record;

    IF req_record THEN
        PERFORM hidden.group_relation_create(
            req_record.group_id,
            req_record.related_group_id,
            req_record.relation_type,
            NOW(),
            NOW(),
            req_record.right_to_inform,
            req_record.right_to_speak,
            req_record.right_to_amend,
            req_record.right_to_vote_active,
            req_record.right_to_vote_passive
                );
    END IF;
END;
$$;

