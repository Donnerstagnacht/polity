DROP FUNCTION IF EXISTS authenticated.search_user(
    _search_term text
);
CREATE OR REPLACE FUNCTION authenticated.search_user(
    _search_term text
)
    RETURNS table
            (
                id_         uuid,
                first_name_ text,
                last_name_  text,
                username_   text,
                img_url_    text
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT
            id,
            first_name,
            last_name,
            username,
            profile_image
        FROM
            hidden.profiles
        WHERE
            fts @@ TO_TSQUERY('german', _search_term);

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No profile matches %', _search_term
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
