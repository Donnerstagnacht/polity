DROP FUNCTION IF EXISTS authenticated.group_read(
    _group_id uuid
);
CREATE OR REPLACE FUNCTION authenticated.group_read(
    _group_id uuid
)
    RETURNS table
            (
                id_          uuid,
                name_        text,
                description_ text,
                level_       hidden.group_level,
                img_url_     text,
                created_at_  timestamp WITH TIME ZONE,
                updated_at_  timestamp WITH TIME ZONE
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT
            id,
            name,
            description,
            level,
            img_url,
            created_at,
            updated_at
        FROM
            hidden.groups
        WHERE
            id = _group_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group found for id % ', _group_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;

--same function but differnt return types that cause issues with the supabase type generation
-- DROP FUNCTION IF EXISTS authenticated.group_read_implied_type(uuid);
-- CREATE OR REPLACE FUNCTION authenticated.group_read_implied_type(group_id uuid)
--     RETURNS hidden.groups
--     LANGUAGE plpgsql
--     SECURITY INVOKER
-- AS
-- $$
-- DECLARE
--     group_record hidden.groups;
-- BEGIN
--     SELECT *
--     INTO group_record
--     FROM
--         hidden.groups
--     WHERE
--         hidden.groups.id = group_id;
--     RETURN group_record;
-- END
-- $$;

-- -- does not work, requires to declare and return a variable
-- DROP FUNCTION IF EXISTS authenticated.group_read_groups_no_variable(uuid);
-- CREATE OR REPLACE FUNCTION authenticated.group_read_groups_no_variable(group_id uuid)
--     RETURNS hidden.groups
--     LANGUAGE plpgsql
--     SECURITY INVOKER
-- AS
-- $$
-- BEGIN
--     SELECT *
--     FROM
--         hidden.groups
--     WHERE
--         hidden.groups.id = group_id;
-- END
-- $$;

-- DROP FUNCTION IF EXISTS authenticated.group_read_record(uuid);
-- CREATE OR REPLACE FUNCTION authenticated.group_read_record(group_id uuid)
--     RETURNS record
--     LANGUAGE plpgsql
--     SECURITY INVOKER
-- AS
-- $$
-- DECLARE
--     group_record record;
-- BEGIN
--     SELECT *
--     INTO group_record
--     FROM
--         hidden.groups
--     WHERE
--         hidden.groups.id = group_id;
--
--     IF FOUND THEN
--         RETURN group_record;
--     END IF;
-- END
-- $$;
