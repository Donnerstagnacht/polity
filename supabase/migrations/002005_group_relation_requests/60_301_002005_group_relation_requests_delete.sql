DROP FUNCTION IF EXISTS hidden.group_relation_requests_delete(
    _group_relation_id uuid
);

CREATE OR REPLACE FUNCTION hidden.group_relation_requests_delete(
    _group_relation_id uuid
)
    RETURNS table
            (deleted_requested_group_relation record
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    deleted_requested_group_relation record;
BEGIN
    DELETE
    FROM
        hidden.group_requested_relations
    WHERE
        id = _group_relation_id
    RETURNING *
        INTO deleted_requested_group_relation;
    RETURN NEXT;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group relation request found for id %', _group_relation_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
