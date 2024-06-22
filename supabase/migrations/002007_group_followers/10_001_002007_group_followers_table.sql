CREATE TABLE IF NOT EXISTS hidden.following_groups
(
    follower  uuid NOT NULL,
    following uuid NOT NULL,
    CONSTRAINT following_groups_pkey PRIMARY KEY (follower, following),
    CONSTRAINT following_groups_follower_fkey FOREIGN KEY (follower)
        REFERENCES hidden.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT following_groups_following_fkey FOREIGN KEY (following)
        REFERENCES hidden.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE hidden.following_groups
    ENABLE ROW LEVEL SECURITY;
