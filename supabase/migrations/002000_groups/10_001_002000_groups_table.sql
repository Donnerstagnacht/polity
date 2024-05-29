CREATE EXTENSION IF NOT EXISTS pg_trgm;

DROP TABLE IF EXISTS hidden.groups CASCADE;
CREATE TABLE IF NOT EXISTS hidden.groups
(
    id          uuid                                                  NOT NULL DEFAULT uuid_generate_v4(),
    creator     uuid                                                  NOT NULL,
    name        text                                                  NOT NULL,
    description text,
    created_at  timestamp WITH TIME ZONE DEFAULT NOW()                NOT NULL,
    updated_at  timestamp WITH TIME ZONE DEFAULT NOW()                NOT NULL,
    level       group_level              DEFAULT 'local'::group_level NOT NULL,
    img_url     text,
    fts         tsvector GENERATED ALWAYS AS (
                    TO_TSVECTOR(
                        'german',
                        (name)
                    )
                    ) STORED,
    CONSTRAINT group_table_pkey PRIMARY KEY (id),
    CONSTRAINT group_table_creator_fkey FOREIGN KEY (creator)
        REFERENCES hidden.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

DROP INDEX IF EXISTS group_table_name_idx CASCADE;
CREATE INDEX group_table_name_idx ON hidden.groups USING gin (fts);

ALTER TABLE hidden.groups
    ENABLE ROW LEVEL SECURITY;
