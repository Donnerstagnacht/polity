CREATE TABLE IF NOT EXISTS authenticated_access.push_subscriptions
(
    id             uuid NOT NULL,
    endpoint       text NOT NULL,
    expirationTime text NULL,
    auth           text NOT NULL,
    p256dh         text NOT NULL,
    CONSTRAINT push_subscriptions_pkey PRIMARY KEY (id),
    CONSTRAINT push_subscriptions_id_fkey FOREIGN KEY (id) REFERENCES authenticated_access.profiles (id) MATCH SIMPLE
);

ALTER TABLE authenticated_access.push_subscriptions
    ENABLE ROW LEVEL SECURITY;
