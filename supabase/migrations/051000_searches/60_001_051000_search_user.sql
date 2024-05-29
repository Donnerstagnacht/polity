DROP FUNCTION IF EXISTS public.search_user(
    _search_term text
);
CREATE OR REPLACE FUNCTION public.search_user(
    _search_term text
)
    RETURNS table
            (
                id         uuid,
                first_name text,
                last_name  text,
                username   text
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
            username
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
