DROP TABLE IF EXISTS hidden.meetings;
CREATE TABLE IF NOT EXISTS hidden.meetings
(
    id          uuid                                   NOT NULL,
    group_id    uuid                                   NOT NULL,
    creator_id  uuid                                   NOT NULL,
    name        text                                   NOT NULL,
    description text,
    type        hidden.meeting_type,
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
        REFERENCES hidden.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT meetings_creator_id_fkey FOREIGN KEY (creator_id)
        REFERENCES hidden.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE INDEX meetings_idx ON hidden.meetings USING gin (fts);

ALTER TABLE hidden.meetings
    ENABLE ROW LEVEL SECURITY;
