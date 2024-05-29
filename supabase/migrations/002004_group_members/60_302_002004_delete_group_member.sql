DROP FUNCTION IF EXISTS hidden.delete_group_member(
    user_id_in uuid,
    group_id_in uuid
);

CREATE OR REPLACE FUNCTION hidden.delete_group_member(
    _user_id uuid,
    _group_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    DELETE
    FROM
        hidden.group_members
    WHERE
          member_id = _user_id
      AND group_id = _group_id;
END;
$$;
