CREATE TABLE IF NOT EXISTS authenticated_access.hashtags
(
    id    uuid NOT NULL,
    value text NOT NULL,
    CONSTRAINT hashtags_pkey PRIMARY KEY (id)
);

ALTER TABLE authenticated_access.hashtags
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Hashtags can be created by authenticated users."
    ON authenticated_access.hashtags;
CREATE POLICY "Hashtags can be created by authenticated users."
    ON authenticated_access.hashtags
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Hashtags are viewable by authenticated users."
    ON authenticated_access.hashtags;
CREATE POLICY "Hashtags are viewable by authenticated users."
    ON authenticated_access.hashtags
    FOR SELECT
    TO authenticated
    USING (TRUE);
