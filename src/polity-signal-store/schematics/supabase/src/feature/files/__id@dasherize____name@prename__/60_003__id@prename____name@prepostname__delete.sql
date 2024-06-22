DROP FUNCTION IF EXISTS authenticated.<%= underscore(name) %>_delete(

);
CREATE OR REPLACE FUNCTION authenticated.<%= underscore(name) %>_delete(

)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
DECLARE

BEGIN
    DELETE
    FROM
        hidden.<%= underscore(name) %>
    WHERE
          ;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No <%= classify(name)%> found for <%= underscore(name) %> with id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
