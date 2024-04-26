CREATE EXTENSION IF NOT EXISTS pg_trgm;

DROP TABLE IF EXISTS authenticated_access.groups CASCADE;
CREATE TABLE IF NOT EXISTS authenticated_access.groups
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
        REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

DROP INDEX IF EXISTS group_table_name_idx CASCADE;
CREATE INDEX group_table_name_idx ON authenticated_access.groups USING gin (fts);

ALTER TABLE authenticated_access.groups
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public groups can be created by by authenticated users."
    ON authenticated_access.groups;
CREATE POLICY "Public groups can be created by by authenticated users."
    ON authenticated_access.groups
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Public groups are viewable by everyone."
    ON authenticated_access.groups;
CREATE POLICY "Public groups are viewable by everyone."
    ON authenticated_access.groups
    FOR SELECT
    USING (TRUE);

-- TODO
DROP POLICY IF EXISTS "Public groups can be updated by board members and presidents."
    ON authenticated_access.groups;
CREATE POLICY "Public groups can be updated by board members and presidents."
    ON authenticated_access.groups
    FOR UPDATE
    TO authenticated
    USING (TRUE);
