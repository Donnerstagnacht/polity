DROP FUNCTION IF EXISTS authenticated_access.delete_group_member(
    user_id_in uuid,
    group_id_in uuid
);

CREATE OR REPLACE FUNCTION authenticated_access.delete_group_member(
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
        authenticated_access.group_members
    WHERE
          member_id = user_id_in
      AND group_id = group_id_in;
END;
$$;
