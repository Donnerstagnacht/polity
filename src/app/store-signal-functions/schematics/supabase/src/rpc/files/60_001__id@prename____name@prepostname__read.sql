DROP FUNCTION IF EXISTS authenticated.<%= underscore(name) %>_read(

);
CREATE OR REPLACE FUNCTION authenticated.<%= underscore(name) %>_read(

)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE

BEGIN

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No <%= classify(name)%> found for user with id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
