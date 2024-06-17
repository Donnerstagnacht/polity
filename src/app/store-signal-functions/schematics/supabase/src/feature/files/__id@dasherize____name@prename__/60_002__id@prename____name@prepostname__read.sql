DROP FUNCTION IF EXISTS authenticated.<%= underscore(name) %>_read(

);
CREATE OR REPLACE FUNCTION authenticated.<%= underscore(name) %>_read(

)
    RETURNS table ( )
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    RETURN QUERY
        SELECT

        FROM
            hidden.<%= underscore(name) %>
        WHERE
            id = _<%= underscore(name) %>_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No <%= classify(name)%> found for <%= underscore(name) %> with id %', auth_user_id
            USING ERRCODE = 'P0002';
    END IF;
END
$$;
