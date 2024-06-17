CREATE OR REPLACE FUNCTION
    postgres.<function_name>()
    RETURNS trigger AS
$$
BEGIN
    INSERT INTO
        hidden..<tablename> (id)
    VALUES
        (new.id);
    RETURN new;
END;
$$ LANGUAGE plpgsql
    SECURITY DEFINER;

CREATE OR REPLACE TRIGGER <%= underscore(name) %>
    AFTER INSERT
    ON hidden.<tablename>
    FOR EACH ROW
EXECUTE PROCEDURE postgres.<function_name>()
