DROP FUNCTION IF EXISTS hidden.delete_group_relation(
    _group_relation_id uuid
);

CREATE OR REPLACE FUNCTION hidden.delete_group_relation(
    _group_relation_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    DELETE
    FROM
        group_relations
    WHERE
        id = _group_relation_id;
END
$$
