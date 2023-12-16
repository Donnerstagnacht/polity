CREATE OR REPLACE FUNCTION
    postgres_access.create_profile()
    RETURNS trigger AS
$$
BEGIN
    INSERT INTO
        authenticated_access.profiles (id)
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
EXECUTE PROCEDURE postgres_access.create_profile()
