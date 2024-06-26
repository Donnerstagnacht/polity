CREATE OR REPLACE FUNCTION
    postgres.create_assistant()
    RETURNS trigger AS
$$
BEGIN
    INSERT INTO
        hidden.assistants (id,
                           first_sign_in,
                           skip_tutorial,
                           last_tutorial)
    VALUES
        (new.id,
         TRUE,
         FALSE,
         'welcome');
    RETURN new;
END;
$$ LANGUAGE plpgsql
    SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created_add_assistant
    AFTER INSERT
    ON hidden.profiles
    FOR EACH ROW
EXECUTE PROCEDURE postgres.create_assistant();
