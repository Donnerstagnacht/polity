CREATE TABLE IF NOT EXISTS hidden.following_profiles
(
    follower  uuid NOT NULL,
    following uuid NOT NULL,
    CONSTRAINT following_profiles_pkey PRIMARY KEY (follower, following),
    CONSTRAINT following_profiles_follower_fkey FOREIGN KEY (follower)
        REFERENCES hidden.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT following_profiles_following_fkey FOREIGN KEY (following)
        REFERENCES hidden.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE hidden.following_profiles
    ENABLE ROW LEVEL SECURITY;
