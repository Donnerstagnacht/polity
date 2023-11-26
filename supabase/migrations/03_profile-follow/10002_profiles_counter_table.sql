CREATE TABLE IF NOT EXISTS public.profiles_counters
(
    id                           uuid                     NOT NULL,
    follower_counter             bigint DEFAULT 0::bigint NOT NULL,
    following_counter            bigint DEFAULT 0::bigint NOT NULL,
    unread_notifications_counter bigint DEFAULT 0::bigint NOT NULL,
    CONSTRAINT profiles_counters_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_counters_id_fkey FOREIGN KEY (id) REFERENCES public.profiles (id) MATCH SIMPLE
);

ALTER TABLE profiles_counters
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles_counters can be followed by by everyone." ON profiles_counters
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Public profiles_counters are viewable by everyone." ON profiles_counters
    FOR SELECT USING (TRUE);

CREATE POLICY "Public profiles_counters can be updated by by everyone." ON profiles_counters
    FOR UPDATE USING (TRUE);

ALTER PUBLICATION supabase_realtime ADD TABLE profiles_counters;
