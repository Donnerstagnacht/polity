DROP FUNCTION IF EXISTS authenticated_access.create_meeting(uuid);

CREATE OR REPLACE FUNCTION authenticated_access.create_meeting(
    group_id uuid,
    creator_id uuid,
    name text,
    description text,
    type meeting_type,
    date timestamp WITH TIME ZONE,
    created_at timestamp WITH TIME ZONE DEFAULT NOW(),
    updated_at timestamp WITH TIME ZONE DEFAULT NOW()
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    INSERT INTO
        authenticated_access.meetings (id,
                                       group_id,
                                       creator_id,
                                       name,
                                       description,
                                       type,
                                       date,
                                       created_at,
                                       updated_at)
    VALUES
        (group_id,
         creator_id,
         name,
         description,
         type,
         date,
         created_at,
         updated_at);
END;
$$;
