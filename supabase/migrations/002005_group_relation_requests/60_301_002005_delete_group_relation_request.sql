DROP FUNCTION IF EXISTS hidden.delete_group_relation_request(
    _group_relation uuid
);

CREATE OR REPLACE FUNCTION hidden.delete_group_relation_request(
    _group_relation uuid
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
        id = _group_relation
    RETURNING *
        INTO deleted_requested_group_relation;
    RETURN NEXT;
END
$$;
