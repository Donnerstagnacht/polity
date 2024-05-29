DROP FUNCTION IF EXISTS public.create_group_member_invitation(
    _group_id uuid,
    _member_id uuid
);

CREATE OR REPLACE FUNCTION public.create_group_member_invitation(
    _group_id uuid,
    _member_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
BEGIN
    INSERT INTO
        hidden.group_invited_members(group_id,
                                     member_id,
                                     member_type)
    VALUES
        (_group_id,
         _member_id,
         'member');
END;
$$;
