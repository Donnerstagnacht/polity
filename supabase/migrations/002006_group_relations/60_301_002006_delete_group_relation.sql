DROP FUNCTION IF EXISTS hidden.delete_group_relation(uuid);

CREATE OR REPLACE FUNCTION hidden.delete_group_relation(
    group_relation_id uuid
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
        id = group_relation_id;
END
$$
