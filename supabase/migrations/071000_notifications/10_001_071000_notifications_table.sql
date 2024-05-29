CREATE TABLE IF NOT EXISTS hidden.notifications_by_user
(
    id                   uuid                     NOT NULL DEFAULT uuid_generate_v4(),
    sender               uuid                     NOT NULL,
    receiver             uuid                     NOT NULL,
    type_of_notification notifications_enum       NOT NULL DEFAULT 'follow_from_user'::notifications_enum,
    read_by_receiver     boolean                  NOT NULL DEFAULT FALSE,
    created_at           timestamp WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT notifications_by_user_pkey PRIMARY KEY (id),
    CONSTRAINT notifications_by_user_sender_fkey FOREIGN KEY (sender) REFERENCES auth.users (id) MATCH SIMPLE,
    CONSTRAINT notifications_by_user_receiver_fkey FOREIGN KEY (receiver) REFERENCES auth.users (id) MATCH SIMPLE
);

ALTER PUBLICATION supabase_realtime ADD TABLE hidden.notifications_by_user;

ALTER TABLE hidden.notifications_by_user
    ENABLE ROW LEVEL SECURITY;
