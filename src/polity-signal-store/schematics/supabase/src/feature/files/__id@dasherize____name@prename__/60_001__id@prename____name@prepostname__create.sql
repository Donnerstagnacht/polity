DROP FUNCTION IF EXISTS authenticated.<%= underscore(name) %>_create(

);
CREATE OR REPLACE FUNCTION authenticated.<%= underscore(name) %>_create(

)
    RETURNS uuid
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE
    <%= underscore(name) %>_id uuid;
BEGIN
    INSERT INTO
        hidden.<%= underscore(name) %> ()
    VALUES
        ()
    RETURNING id INTO <%= underscore(name) %>_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No <%= classify(name)%> found for user with id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;

    RETURN <%= underscore(name) %>_id;
END
$$;
