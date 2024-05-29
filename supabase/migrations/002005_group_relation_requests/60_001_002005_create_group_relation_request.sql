DROP FUNCTION IF EXISTS hidden.create_group_requested_relation(
    _group_id uuid,
    _related_group_id uuid,
    _relation_type hidden.group_relation,
    _created_at timestamp WITH TIME ZONE,
    _updated_at timestamp WITH TIME ZONE,
    _right_to_inform boolean,
    _right_to_speak boolean,
    _right_to_amend boolean,
    _right_to_vote_active boolean,
    _right_to_vote_passive boolean
);

CREATE OR REPLACE FUNCTION hidden.create_group_requested_relation(
    _group_id uuid,
    _related_group_id uuid,
    _relation_type hidden.group_relation,
    _created_at timestamp WITH TIME ZONE DEFAULT NOW(),
    _updated_at timestamp WITH TIME ZONE DEFAULT NOW(),
    _right_to_inform boolean DEFAULT FALSE,
    _right_to_speak boolean DEFAULT FALSE,
    _right_to_amend boolean DEFAULT FALSE,
    _right_to_vote_active boolean DEFAULT FALSE,
    _right_to_vote_passive boolean DEFAULT FALSE
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
        (_group_id,
         _related_group_id,
         _relation_type,
         _created_at,
         _updated_at,
         _right_to_inform,
         _right_to_speak,
         _right_to_amend,
         _right_to_vote_active,
         _right_to_vote_passive);
END;
$$
