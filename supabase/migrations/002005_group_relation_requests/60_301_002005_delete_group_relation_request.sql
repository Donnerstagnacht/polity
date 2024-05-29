DROP FUNCTION IF EXISTS hidden.delete_group_requested_relations(uuid);

CREATE OR REPLACE FUNCTION hidden.delete_group_requested_relations(
    group_relation_id uuid
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
        group_requested_relations
    WHERE
        id = group_relation_id
    RETURNING *
        INTO deleted_requested_group_relation;
    RETURN NEXT;
END
$$;
