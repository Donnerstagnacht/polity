DROP FUNCTION IF EXISTS hidden.create_group(
    _name text,
    _description text,
    _level group_level,
    _created_by uuid,
    _created_at timestamp WITH TIME ZONE,
    _updated_at timestamp WITH TIME ZONE
);

CREATE OR REPLACE FUNCTION hidden.create_group(
    _name text,
    _description text,
    _level hidden.group_level,
    _created_by uuid,
    _created_at timestamp WITH TIME ZONE DEFAULT NOW(),
    _updated_at timestamp WITH TIME ZONE DEFAULT NOW()
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
        (_name,
         _description,
         _level,
         _created_by,
         _created_at,
         _updated_at)
    RETURNING id INTO group_id;
    RETURN group_id;
END;
$$;
