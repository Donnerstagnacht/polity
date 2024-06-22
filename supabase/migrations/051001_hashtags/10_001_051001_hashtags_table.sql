CREATE TABLE IF NOT EXISTS hidden.hashtags
(
    id    uuid NOT NULL,
    value text NOT NULL,
    CONSTRAINT hashtags_pkey PRIMARY KEY (id)
);

ALTER TABLE hidden.hashtags
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Hashtags can be created by authenticated users."
    ON hidden.hashtags;
CREATE POLICY "Hashtags can be created by authenticated users."
    ON hidden.hashtags
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Hashtags are viewable by authenticated users."
    ON hidden.hashtags;
CREATE POLICY "Hashtags are viewable by authenticated users."
    ON hidden.hashtags
    FOR SELECT
    TO authenticated
    USING (TRUE);
