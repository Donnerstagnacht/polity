CREATE TABLE IF NOT EXISTS authenticated_access.group_hashtags
(
    id         uuid NOT NULL,
    group_id   uuid NOT NULL,
    hashtag_id uuid NOT NULL,
    CONSTRAINT group_hashtag_pkey PRIMARY KEY (id),
    CONSTRAINT group_hashtag_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES authenticated_access.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT group_hashtag_hashtag_id_fkey FOREIGN KEY (hashtag_id)
        REFERENCES authenticated_access.hashtags (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE authenticated_access.group_hashtags
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Hashtags can be created by authenticated users"
    ON authenticated_access.group_hashtags;
CREATE POLICY "Hashtags can be created by authenticated users"
    ON authenticated_access.group_hashtags
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Hashtags are viewable by authenticated users"
    ON authenticated_access.group_hashtags;
CREATE POLICY "Hashtags are viewable by authenticated users"
    ON authenticated_access.group_hashtags
    FOR SELECT
    TO authenticated
    USING (TRUE);

