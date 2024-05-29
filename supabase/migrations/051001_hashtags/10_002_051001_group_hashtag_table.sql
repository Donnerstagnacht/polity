CREATE TABLE IF NOT EXISTS hidden.group_hashtags
(
    id         uuid NOT NULL,
    group_id   uuid NOT NULL,
    hashtag_id uuid NOT NULL,
    CONSTRAINT group_hashtag_pkey PRIMARY KEY (id),
    CONSTRAINT group_hashtag_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES hidden.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT group_hashtag_hashtag_id_fkey FOREIGN KEY (hashtag_id)
        REFERENCES hidden.hashtags (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE hidden.group_hashtags
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Hashtags can be created by authenticated users"
    ON hidden.group_hashtags;
CREATE POLICY "Hashtags can be created by authenticated users"
    ON hidden.group_hashtags
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Hashtags are viewable by authenticated users"
    ON hidden.group_hashtags;
CREATE POLICY "Hashtags are viewable by authenticated users"
    ON hidden.group_hashtags
    FOR SELECT
    TO authenticated
    USING (TRUE);

