DROP FUNCTION IF EXISTS authenticated_access.create_group(
    text,
    text,
    uuid,
    timestamp WITH TIME ZONE,
    timestamp WITH TIME ZONE
);

CREATE OR REPLACE FUNCTION authenticated_access.create_group(
    name text,
    description text,
    created_by uuid,
    created_at timestamp WITH TIME ZONE DEFAULT NOW(),
    updated_at timestamp WITH TIME ZONE DEFAULT NOW()
)
    RETURNS uuid
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    group_id uuid;
BEGIN
    INSERT INTO
        authenticated_access.groups (name,
                                     description,
                                     creator,
                                     created_at,
                                     updated_at)
    VALUES
        (name,
         description,
         created_by,
         created_at,
         updated_at)
    RETURNING id INTO group_id;
    RETURN group_id;
END;
$$;
