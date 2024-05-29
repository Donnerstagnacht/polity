DROP FUNCTION IF EXISTS hidden.create_group(
    text,
    text,
    group_level,
    uuid,
    timestamp WITH TIME ZONE,
    timestamp WITH TIME ZONE
);

CREATE OR REPLACE FUNCTION hidden.create_group(
    name text,
    description text,
    level group_level,
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
        hidden.groups (name,
                                     description,
                                     level,
                                     creator,
                                     created_at,
                                     updated_at)
    VALUES
        (name,
         description,
         level,
         created_by,
         created_at,
         updated_at)
    RETURNING id INTO group_id;
    RETURN group_id;
END;
$$;
