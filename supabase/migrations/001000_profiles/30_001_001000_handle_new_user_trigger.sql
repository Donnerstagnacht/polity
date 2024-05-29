CREATE OR REPLACE FUNCTION
    postgres.create_profile()
    RETURNS trigger AS
$$
BEGIN
    INSERT INTO
        hidden.profiles (id)
    VALUES
        (new.id);
    RETURN new;
END;
$$ LANGUAGE plpgsql
    SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created_add_profile
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
EXECUTE PROCEDURE postgres.create_profile()
