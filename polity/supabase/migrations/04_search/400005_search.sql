DROP FUNCTION IF EXISTS public.search_user(search_term text);
CREATE OR REPLACE FUNCTION public.search_user(search_term text)
    RETURNS setof profiles
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT * FROM public.profiles WHERE fts @@ TO_TSQUERY('german', search_term);
END
$$;
