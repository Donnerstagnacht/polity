DROP FUNCTION IF EXISTS authenticated.search_group(
    _search_term text
);
CREATE OR REPLACE FUNCTION authenticated.search_group(
    _search_term text
)
    RETURNS table
            (
                id_          uuid,
                name_        text,
                level_       hidden.group_level,
                description_ text
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT
            id,
            name,
            level,
            description
        FROM
            hidden.groups
        WHERE
            fts @@ TO_TSQUERY('german', _search_term);

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No group matches %', _search_term
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
