CREATE TABLE IF NOT EXISTS public.following_profiles
(
    follower  uuid NOT NULL,
    following uuid NOT NULL,
    CONSTRAINT following_profiles_pkey PRIMARY KEY (follower, following),
    CONSTRAINT following_profiles_follower_fkey FOREIGN KEY (follower)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT following_profiles_following_fkey FOREIGN KEY (following)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE following_profiles
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public following_profiles can be followed by by everyone." ON following_profiles
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Public following_profiles are viewable by everyone." ON following_profiles
    FOR SELECT USING (TRUE);

CREATE POLICY "Public following_profiles can be updated by by everyone." ON following_profiles
    FOR UPDATE USING (TRUE);
