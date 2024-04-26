CREATE TABLE IF NOT EXISTS authenticated_access.group_relations
(
    id                    uuid                                   NOT NULL,
    group_id              uuid                                   NOT NULL,
    related_group_id      uuid                                   NOT NULL,
    relation_type         group_relation,
    created_at            timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at            timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    right_to_inform       boolean                  DEFAULT FALSE,
    right_to_speak        boolean                  DEFAULT FALSE,
    right_to_amend        boolean                  DEFAULT FALSE,
    right_to_vote_active  boolean                  DEFAULT FALSE,
    right_to_vote_passive boolean                  DEFAULT FALSE,
    CONSTRAINT group_relation_pkey PRIMARY KEY (id),
    CONSTRAINT group_relation_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES authenticated_access.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT group_relation_related_id_fkey FOREIGN KEY (related_group_id)
        REFERENCES authenticated_access.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE authenticated_access.group_relations
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Group relations can be created by board members and presidents of involved groups."
    ON authenticated_access.group_relations;
CREATE POLICY "Group relations can be created by board members and presidents of involved groups."
    ON authenticated_access.group_relations
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Group relations are viewable by authenticated users."
    ON authenticated_access.group_relations;
CREATE POLICY "Group relations are viewable by authenticated users."
    ON authenticated_access.group_relations
    FOR SELECT
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Group relations can be updated by board members and presidents of involved groups."
    ON authenticated_access.group_relations;
CREATE POLICY "Group relations can be updated by board members and presidents of involved groups."
    ON authenticated_access.group_relations
    FOR UPDATE
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Group relations can be deleted by board members and presidents of involved groups."
    ON authenticated_access.group_relations;
CREATE POLICY "Group relations can be deleted by board members and presidents of involved groups."
    ON authenticated_access.group_relations
    FOR DELETE
    TO authenticated
    USING (TRUE);
