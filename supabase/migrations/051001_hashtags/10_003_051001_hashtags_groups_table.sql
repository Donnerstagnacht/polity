CREATE TABLE IF NOT EXISTS hidden.hashtag_groups
(
    id         uuid NOT NULL,
    group_id   uuid NOT NULL,
    hashtag_id uuid NOT NULL,
    CONSTRAINT hashtag_groups_pkey PRIMARY KEY (id),
    CONSTRAINT hashtag_groups_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES hidden.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT hashtag_groups_hashtag_id_fkey FOREIGN KEY (hashtag_id)
        REFERENCES hidden.hashtags (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE hidden.hashtag_groups
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Hashtag groups can be created by board members and presidents of involved groups."
    ON hidden.hashtag_groups;
CREATE POLICY "Hashtag groups can be created by board members and presidents of involved groups."
    ON hidden.hashtag_groups
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Hashtag groups are viewable by authenticated users."
    ON hidden.hashtag_groups;
CREATE POLICY "Hashtag groups are viewable by authenticated users."
    ON hidden.hashtag_groups
    FOR SELECT
    TO authenticated
    USING (TRUE);

DROP POLICY IF EXISTS "Hashtag groups can be deleted by board members and presidents of involved groups."
    ON hidden.hashtag_groups;
CREATE POLICY "Hashtag groups can be deleted by board members and presidents of involved groups."
    ON hidden.hashtag_groups
    FOR DELETE
    TO authenticated
    USING (TRUE);
