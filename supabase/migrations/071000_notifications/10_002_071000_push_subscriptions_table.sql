CREATE TABLE IF NOT EXISTS hidden.push_subscriptions
(
    id             uuid NOT NULL,
    endpoint       text NOT NULL,
    expirationTime text NULL,
    auth           text NOT NULL,
    p256dh         text NOT NULL,
    CONSTRAINT push_subscriptions_pkey PRIMARY KEY (id),
    CONSTRAINT push_subscriptions_id_fkey FOREIGN KEY (id) REFERENCES hidden.profiles (id) MATCH SIMPLE
);

ALTER TABLE hidden.push_subscriptions
    ENABLE ROW LEVEL SECURITY;
