DROP FUNCTION IF EXISTS create_group_relation(
    group_id uuid,
    related_group_id uuid,
    relation_type group_relation,
    created_by timestamp WITH TIME ZONE,
    updated_at timestamp WITH TIME ZONE,
    right_to_inform boolean,
    right_to_speak boolean,
    right_to_amend boolean,
    right_to_vote_active boolean,
    right_to_vote_passive boolean
);

CREATE OR REPLACE FUNCTION create_group_relation(
    group_id uuid,
    related_group_id uuid,
    relation_type group_relation,
    created_by timestamp WITH TIME ZONE DEFAULT NOW(),
    updated_at timestamp WITH TIME ZONE DEFAULT NOW(),
    right_to_inform boolean DEFAULT FALSE,
    right_to_speak boolean DEFAULT FALSE,
    right_to_amend boolean DEFAULT FALSE,
    right_to_vote_active boolean DEFAULT FALSE,
    right_to_vote_passive boolean DEFAULT FALSE
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    INSERT INTO
        group_relations
    (group_id,
     related_group_id,
     relation_type,
     created_by,
     updated_at,
     right_to_inform,
     right_to_speak,
     right_to_amend,
     right_to_vote_active,
     right_to_vote_passive)
    VALUES
        (group_id,
         related_group_id,
         relation_type,
         created_by,
         updated_at,
         right_to_inform,
         right_to_speak,
         right_to_amend,
         right_to_vote_active,
         right_to_vote_passive);
END
$$;
