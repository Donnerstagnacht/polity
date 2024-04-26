DROP FUNCTION IF EXISTS authenticated_access.create_group_transaction(
    name text,
    description text,
    created_by uuid
);

CREATE OR REPLACE FUNCTION authenticated_access.create_group_transaction(
    name text,
    description text,
    created_by uuid
)
    RETURNS void
    LANGUAGE plpgsql
AS
$$
DECLARE
    group_id uuid;
BEGIN
    group_id := authenticated_access.create_group(
        name,
        description,
        created_by);
    PERFORM authenticated_access.create_group_member(
        group_id,
        created_by,
        'board_president');
END;
$$;
