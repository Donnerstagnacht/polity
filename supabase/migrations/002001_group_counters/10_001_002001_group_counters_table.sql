DROP TABLE IF EXISTS authenticated_access.groups_counters CASCADE;
CREATE TABLE IF NOT EXISTS authenticated_access.groups_counters
(
    id                           uuid                     NOT NULL,
    follower_counter             bigint DEFAULT 0::bigint NOT NULL,
    following_counter            bigint DEFAULT 0::bigint NOT NULL,
    group_member_counter         bigint DEFAULT 0::bigint NOT NULL,
    unread_notifications_counter bigint DEFAULT 0::bigint NOT NULL,
    CONSTRAINT groups_counters_pkey PRIMARY KEY (id),
    CONSTRAINT groups_counters_id_fkey FOREIGN KEY (id) REFERENCES authenticated_access.groups (id) MATCH SIMPLE
);

ALTER PUBLICATION supabase_realtime ADD TABLE authenticated_access.groups_counters;

ALTER TABLE authenticated_access.groups_counters
    ENABLE ROW LEVEL SECURITY;
