CREATE TABLE IF NOT EXISTS hidden.profiles_counters
(
    id                           uuid                     NOT NULL,
    follower_counter             bigint DEFAULT 0::bigint NOT NULL,
    following_counter            bigint DEFAULT 0::bigint NOT NULL,
    group_membership_counter     bigint DEFAULT 0::bigint NOT NULL,
    unread_notifications_counter bigint DEFAULT 0::bigint NOT NULL,
    CONSTRAINT profiles_counters_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_counters_id_fkey FOREIGN KEY (id) REFERENCES hidden.profiles (id) MATCH SIMPLE
);

ALTER PUBLICATION supabase_realtime ADD TABLE hidden.profiles_counters;

ALTER TABLE hidden.profiles_counters
    ENABLE ROW LEVEL SECURITY;
