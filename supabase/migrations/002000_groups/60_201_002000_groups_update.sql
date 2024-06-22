DROP FUNCTION IF EXISTS authenticated.groups_update(
    _id uuid,
    _name text,
    _description text,
    _img_url text
);
CREATE OR REPLACE FUNCTION authenticated.groups_update(
    _id uuid,
    _name text DEFAULT NULL,
    _description text DEFAULT NULL,
    _img_url text DEFAULT NULL
)
    RETURNS table
            (
                id_          uuid,
                name_        text,
                description_ text,
                level_       hidden.group_level,
                img_url_     text,
                created_at_  timestamp WITH TIME ZONE,
                updated_at_  timestamp WITH TIME ZONE
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RAISE NOTICE 'Input id: %', _id;
    RETURN QUERY
        UPDATE hidden.groups
            SET
                name = COALESCE(_name, name),
                description = COALESCE(_description, description),
                img_url = COALESCE(_img_url, img_url)
            WHERE
                hidden.groups.id = _id
            RETURNING
                id,
                name,
                description,
                level,
                img_url,
                created_at,
                updated_at;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group found with id %', _id
            USING ERRCODE = 'P0002';
    END IF;

END
$$;
