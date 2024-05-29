DROP TABLE IF EXISTS hidden.group_members CASCADE;
CREATE TABLE IF NOT EXISTS hidden.group_members
(
    id          uuid                                   NOT NULL DEFAULT uuid_generate_v4(),
    group_id    uuid                                   NOT NULL,
    member_id   uuid                                   NOT NULL,
    member_type group_member,
    created_at  timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at  timestamp WITH TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT group_member_pkey PRIMARY KEY (id),
    CONSTRAINT group_member_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES hidden.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT group_member_member_id_fkey FOREIGN KEY (member_id)
        REFERENCES hidden.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE hidden.group_members
    ENABLE ROW LEVEL SECURITY;
