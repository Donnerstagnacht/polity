CREATE TABLE IF NOT EXISTS authenticated_access.following_groups
(
    follower  uuid NOT NULL,
    following uuid NOT NULL,
    CONSTRAINT following_groups_pkey PRIMARY KEY (follower, following),
    CONSTRAINT following_groups_follower_fkey FOREIGN KEY (follower)
        REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT following_groups_following_fkey FOREIGN KEY (following)
        REFERENCES authenticated_access.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE authenticated_access.following_groups
    ENABLE ROW LEVEL SECURITY;
