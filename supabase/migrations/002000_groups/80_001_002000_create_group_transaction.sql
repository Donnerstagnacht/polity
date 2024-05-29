DROP FUNCTION IF EXISTS public.create_group_transaction(
    _name text,
    _description text,
    _level group_level,
    _invited_members uuid[]
);

CREATE OR REPLACE FUNCTION public.create_group_transaction(
    _name text,
    _description text,
    _level group_level,
    _invited_members uuid[]
)
    RETURNS void
    LANGUAGE plpgsql
AS
$$
DECLARE
    group_id       uuid;
    auth_user_id   uuid;
    invited_member uuid;
BEGIN
    auth_user_id = auth.uid();
    group_id := hidden.create_group(
        _name,
        _description,
        _level,
        auth_user_id
                );

    FOREACH invited_member IN ARRAY _invited_members
        LOOP
            PERFORM hidden.create_group_member(
                group_id,
                invited_member,
                'member');
        END LOOP;

    PERFORM hidden.create_group_member(
        group_id,
        auth_user_id,
        'board_president');

    FOREACH invited_member IN ARRAY _invited_members
        LOOP
            PERFORM hidden.increment_group_member_counter(
                group_id
                    );
        END LOOP;

    PERFORM hidden.increment_group_member_counter(
        group_id
            );
END;
$$;
