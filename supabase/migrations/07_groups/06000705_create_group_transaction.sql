DROP FUNCTION IF EXISTS public.create_group_transaction(
    name text,
    description text,
    level group_level,
    invited_members uuid[]
);

CREATE OR REPLACE FUNCTION public.create_group_transaction(
    name text,
    description text,
    level group_level,
    invited_members uuid[]
)
    RETURNS void
    LANGUAGE plpgsql
AS
$$
DECLARE
    group_id          uuid;
    logged_in_user_id uuid;
    invited_member    uuid;
BEGIN
    logged_in_user_id = auth.uid();
    group_id := authenticated_access.create_group(
        name,
        description,
        level,
        logged_in_user_id
                );

    FOREACH invited_member IN ARRAY invited_members
        LOOP
            PERFORM authenticated_access.create_group_member(
                group_id,
                invited_member,
                'member');
        END LOOP;

    PERFORM authenticated_access.create_group_member(
        group_id,
        logged_in_user_id,
        'board_president');

    FOREACH invited_member IN ARRAY invited_members
        LOOP
            PERFORM authenticated_access.increment_group_member_counter(
                group_id
                    );
        END LOOP;

    PERFORM authenticated_access.increment_group_member_counter(
        group_id
            );
END;
$$;
