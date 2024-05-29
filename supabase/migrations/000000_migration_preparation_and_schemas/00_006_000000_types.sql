CREATE TYPE delete_group AS
(
    group_id  uuid,
    member_id uuid
);

CREATE TYPE membership AS
(
    id        uuid,
    group_id  uuid,
    member_id uuid
);
