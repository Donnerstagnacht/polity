DROP TABLE IF EXISTS authenticated_access.meetings;
CREATE TABLE IF NOT EXISTS authenticated_access.meetings
(
    id          uuid                                   NOT NULL,
    group_id    uuid                                   NOT NULL,
    creator_id  uuid                                   NOT NULL,
    name        text                                   NOT NULL,
    description text,
    type        meeting_type,
    date        timestamp WITH TIME ZONE               NOT NULL,
    created_at  timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at  timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    fts         tsvector GENERATED ALWAYS AS (
                    TO_TSVECTOR(
                        'german',
                        (name)
                    )
                    ) STORED,
    CONSTRAINT meetings_pkey PRIMARY KEY (id),
    CONSTRAINT meetings_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES authenticated_access.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT meetings_creator_id_fkey FOREIGN KEY (creator_id)
        REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE INDEX meetings_idx ON authenticated_access.meetings USING gin (fts);

ALTER TABLE authenticated_access.meetings
    ENABLE ROW LEVEL SECURITY;

-- TODO
DROP POLICY IF EXISTS "Meetings can be created by authenticated users which are members of the associated group."
    ON authenticated_access.meetings;
CREATE POLICY "Meetings can be created by authenticated users which are members of the associated group."
    ON authenticated_access.meetings
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Meetings can be viewed by authenticated users."
    ON authenticated_access.meetings;
CREATE POLICY "Meetings can be viewed by authenticated users."
    ON authenticated_access.meetings
    FOR SELECT
    TO authenticated
    USING (TRUE);

-- TODO
DROP POLICY IF EXISTS "Meetings can be updated by creators and board members and presidents of the associated group."
    ON authenticated_access.meetings;
CREATE POLICY "Meetings can be updated by creators and board members and presidents of the associated group."
    ON authenticated_access.meetings
    FOR UPDATE
    TO authenticated
    USING (TRUE);

-- TODO
DROP POLICY IF EXISTS "Meetings can be deleted by creators and board members and presidents of the associated group."
    ON authenticated_access.meetings;
CREATE POLICY "Meetings can be deleted by creators and board members and presidents of the associated group."
    ON authenticated_access.meetings
    FOR DELETE
    TO authenticated
    USING (TRUE);

