DROP FUNCTION IF EXISTS authenticated.group_member_invitations_create(
    _group_id uuid,
    _member_id uuid
);

CREATE OR REPLACE FUNCTION authenticated.group_member_invitations_create(
    _group_id uuid,
    _member_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
DECLARE
    auth_user_id uuid;
BEGIN
    auth_user_id = auth.uid();
    INSERT INTO
        hidden.group_invited_members(group_id,
                                     member_id,
                                     member_type,
                                     invited_by)
    VALUES
        (_group_id,
         _member_id,
         'member',
         auth_user_id);
END;
$$;
