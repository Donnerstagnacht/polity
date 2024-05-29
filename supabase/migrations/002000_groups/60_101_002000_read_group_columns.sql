DROP FUNCTION IF EXISTS public.read_group_columns(uuid);
CREATE OR REPLACE FUNCTION public.read_group_columns(group_id uuid)
    RETURNS table
            (
                id          uuid,
                name        text,
                level       group_level,
                description text
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT
            hidden.groups.id,
            hidden.groups.name,
            hidden.groups.level,
            hidden.groups.description
        FROM
            hidden.groups
        WHERE
            hidden.groups.id = group_id;
END
$$;

--same function but differnt return types that cause issues with the supabase type generation
-- DROP FUNCTION IF EXISTS public.read_group_implied_type(uuid);
-- CREATE OR REPLACE FUNCTION public.read_group_implied_type(group_id uuid)
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
-- DROP FUNCTION IF EXISTS public.read_group_groups_no_variable(uuid);
-- CREATE OR REPLACE FUNCTION public.read_group_groups_no_variable(group_id uuid)
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

-- DROP FUNCTION IF EXISTS public.read_group_record(uuid);
-- CREATE OR REPLACE FUNCTION public.read_group_record(group_id uuid)
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
