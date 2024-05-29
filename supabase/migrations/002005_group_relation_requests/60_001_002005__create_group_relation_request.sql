DROP FUNCTION IF EXISTS hidden.create_group_requested_relation(
    uuid,
    uuid,
    group_relation,
    timestamp WITH TIME ZONE,
    timestamp WITH TIME ZONE,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean
);

CREATE OR REPLACE FUNCTION hidden.create_group_requested_relation(
    group_id uuid,
    related_group_id uuid,
    relation_type group_relation,
    created_at timestamp WITH TIME ZONE DEFAULT NOW(),
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
        hidden.group_requested_relations
    (group_id,
     related_group_id,
     relation_type,
     created_at,
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
         created_at,
         updated_at,
         right_to_inform,
         right_to_speak,
         right_to_amend,
         right_to_vote_active,
         right_to_vote_passive);
END;
$$
