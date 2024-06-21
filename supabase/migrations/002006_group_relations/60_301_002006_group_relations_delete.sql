DROP FUNCTION IF EXISTS hidden.group_relations_delete(
    _group_relation_id uuid
);

CREATE OR REPLACE FUNCTION hidden.group_relations_delete(
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

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group relation request found for group id %', _group_relation_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$
