CREATE OR REPLACE FUNCTION
    postgres.create_profile_counter()
    RETURNS trigger AS
$$
BEGIN
    INSERT INTO
        hidden.profiles_counters (id,
                                  follower_counter,
                                  following_counter)
    VALUES
        (new.id,
         0,
         0);
    RETURN new;
END;
$$ LANGUAGE plpgsql
    SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created_add_profile_counter
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
EXECUTE PROCEDURE postgres.create_profile_counter();
