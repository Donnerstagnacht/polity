DROP FUNCTION IF EXISTS authenticated_access.accept_group_relation_request_transaction(
    uuid,
    uuid
);

CREATE OR REPLACE FUNCTION authenticated_access.accept_group_relation_request_transaction(
    group_relation_request_id uuid,
    group_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    req_record RECORD;
BEGIN
    SELECT *
    FROM
        authenticated_access.delete_group_relation_request(
            group_relation_request_id
        )
    INTO req_record;

    IF FOUND req_record THEN
        PERFORM authenticated_access.create_group_relation(
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

