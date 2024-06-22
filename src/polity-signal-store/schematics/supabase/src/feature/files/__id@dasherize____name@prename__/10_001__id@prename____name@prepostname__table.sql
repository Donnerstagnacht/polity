CREATE EXTENSION IF NOT EXISTS pg_trgm;

DROP TABLE IF EXISTS hidden.<%= underscore(name) %> CASCADE;
CREATE TABLE IF NOT EXISTS hidden.<%= underscore(name) %>
(
    id          uuid                                                         NOT NULL DEFAULT uuid_generate_v4(),
    creator     uuid                                                         NOT NULL,
    name        text                                                         NOT NULL,
    created_at  timestamp WITH TIME ZONE DEFAULT NOW()                       NOT NULL,
    level       hidden.group_level       DEFAULT 'local'::hidden.group_level NOT NULL,
    fts         tsvector GENERATED ALWAYS AS (
                    TO_TSVECTOR(
                        'german',
                        (name)
                    )
                    ) STORED,
    CONSTRAINT <%= underscore(name) %>_table_pkey PRIMARY KEY (id),
    CONSTRAINT <%= underscore(name) %>_table_creator_fkey FOREIGN KEY (creator)
        REFERENCES hidden.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

DROP INDEX IF EXISTS group_table_name_idx CASCADE;
CREATE INDEX <%= underscore(name) %>_table_name_idx ON hidden.<%= underscore(name) %> USING gin (fts);

ALTER TABLE hidden.<%= underscore(name) %>
    ENABLE ROW LEVEL SECURITY;
