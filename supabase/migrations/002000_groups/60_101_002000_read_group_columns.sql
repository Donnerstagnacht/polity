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
            authenticated_access.groups.id,
            authenticated_access.groups.name,
            authenticated_access.groups.level,
            authenticated_access.groups.description
        FROM
            authenticated_access.groups
        WHERE
            authenticated_access.groups.id = group_id;
END
$$;

--same function but differnt return types that cause issues with the supabase type generation
-- DROP FUNCTION IF EXISTS public.read_group_implied_type(uuid);
-- CREATE OR REPLACE FUNCTION public.read_group_implied_type(group_id uuid)
--     RETURNS authenticated_access.groups
--     LANGUAGE plpgsql
--     SECURITY INVOKER
-- AS
-- $$
-- DECLARE
--     group_record authenticated_access.groups;
-- BEGIN
--     SELECT *
--     INTO group_record
--     FROM
--         authenticated_access.groups
--     WHERE
--         authenticated_access.groups.id = group_id;
--     RETURN group_record;
-- END
-- $$;

-- -- does not work, requires to declare and return a variable
-- DROP FUNCTION IF EXISTS public.read_group_groups_no_variable(uuid);
-- CREATE OR REPLACE FUNCTION public.read_group_groups_no_variable(group_id uuid)
--     RETURNS authenticated_access.groups
--     LANGUAGE plpgsql
--     SECURITY INVOKER
-- AS
-- $$
-- BEGIN
--     SELECT *
--     FROM
--         authenticated_access.groups
--     WHERE
--         authenticated_access.groups.id = group_id;
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
--         authenticated_access.groups
--     WHERE
--         authenticated_access.groups.id = group_id;
--
--     IF FOUND THEN
--         RETURN group_record;
--     END IF;
-- END
-- $$;
