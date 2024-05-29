DROP FUNCTION IF EXISTS hidden.delete_group_member(
    user_id_in uuid,
    group_id_in uuid
);

CREATE OR REPLACE FUNCTION hidden.delete_group_member(
    user_id_in uuid,
    group_id_in uuid
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
          member_id = user_id_in
      AND group_id = group_id_in;
END;
$$;
