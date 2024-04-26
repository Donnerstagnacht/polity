DROP FUNCTION IF EXISTS authenticated_access.read_group(uuid);
CREATE OR REPLACE FUNCTION authenticated_access.read_group(group_id uuid)
    RETURNS table
            (
                id          uuid,
                name        text,
                description text,
                created_by  uuid,
                created_at  timestamp WITH TIME ZONE,
                updated_at  timestamp WITH TIME ZONE
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT *
        FROM
            groups
        WHERE
            id = group_id;
END
$$;
