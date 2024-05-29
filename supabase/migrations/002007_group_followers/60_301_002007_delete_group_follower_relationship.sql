DROP FUNCTION IF EXISTS hidden.delete_group_follower_relationship(
    _follower_id uuid,
    _following_id uuid
);
CREATE OR REPLACE FUNCTION hidden.delete_group_follower_relationship(
    _follower_id uuid,
    _following_id uuid
)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    DELETE
    FROM
        hidden.following_groups
    WHERE
          follower = _follower_id
      AND following = _following_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group follower found for follower id % and following id %', _follower_id, _following_id
            USING ERRCODE = 'P0002';
    END IF;
END;
$$;

