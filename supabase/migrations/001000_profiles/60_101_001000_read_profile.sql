DROP FUNCTION IF EXISTS public.read_profile(
    _user_id uuid
);
CREATE OR REPLACE FUNCTION public.read_profile(
    _user_id uuid
)
    RETURNS table
            (
                profile_id    uuid,
                first_name    text,
                last_name     text,
                profile_image text
            )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY (
        SELECT
            p.id,
            p.first_name,
            p.last_name,
            p.profile_image
        FROM
            hidden.profiles p
        WHERE
            p.id = _user_id
    );

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No profile found for user with id %', _user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
