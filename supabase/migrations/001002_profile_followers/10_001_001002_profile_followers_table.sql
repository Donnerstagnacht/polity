CREATE TABLE IF NOT EXISTS authenticated_access.following_profiles
(
    follower  uuid NOT NULL,
    following uuid NOT NULL,
    CONSTRAINT following_profiles_pkey PRIMARY KEY (follower, following),
    CONSTRAINT following_profiles_follower_fkey FOREIGN KEY (follower)
        REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT following_profiles_following_fkey FOREIGN KEY (following)
        REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE authenticated_access.following_profiles
    ENABLE ROW LEVEL SECURITY;
