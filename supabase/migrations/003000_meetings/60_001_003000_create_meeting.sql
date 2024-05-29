DROP FUNCTION IF EXISTS hidden.create_meeting(
    _group_id uuid,
    _creator_id uuid,
    _name text,
    _description text,
    _type meeting_type,
    _date timestamp WITH TIME ZONE,
    _created_at timestamp WITH TIME ZONE,
    _updated_at timestamp WITH TIME ZONE
);

CREATE OR REPLACE FUNCTION hidden.create_meeting(
    _group_id uuid,
    _creator_id uuid,
    _name text,
    _description text,
    _type meeting_type,
    _date timestamp WITH TIME ZONE,
    _created_at timestamp WITH TIME ZONE DEFAULT NOW(),
    _updated_at timestamp WITH TIME ZONE DEFAULT NOW()
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    INSERT INTO
        hidden.meetings (id,
                         group_id,
                         creator_id,
                         name,
                         description,
                         type,
                         date,
                         created_at,
                         updated_at)
    VALUES
        (_group_id,
         _creator_id,
         _name,
         _description,
         _type,
         _date,
         _created_at,
         _updated_at);
END;
$$;
