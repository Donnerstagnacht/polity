CREATE TABLE IF NOT EXISTS hidden.group_requested_relations
(
    id                    uuid                                   NOT NULL,
    group_id              uuid                                   NOT NULL,
    related_group_id      uuid                                   NOT NULL,
    relation_type         hidden.group_relation,
    created_at            timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at            timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    right_to_inform       boolean                  DEFAULT FALSE,
    right_to_speak        boolean                  DEFAULT FALSE,
    right_to_amend        boolean                  DEFAULT FALSE,
    right_to_vote_active  boolean                  DEFAULT FALSE,
    right_to_vote_passive boolean                  DEFAULT FALSE,
    CONSTRAINT group_requested_relation_pkey PRIMARY KEY (id),
    CONSTRAINT group_requested_relation_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES hidden.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT group_requested_relation_related_id_fkey FOREIGN KEY (related_group_id)
        REFERENCES hidden.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE hidden.group_requested_relations
    ENABLE ROW LEVEL SECURITY;
