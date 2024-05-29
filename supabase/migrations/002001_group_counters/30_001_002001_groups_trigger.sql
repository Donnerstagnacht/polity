CREATE OR REPLACE FUNCTION
    postgres.create_groups_counter()
    RETURNS trigger AS
$$
BEGIN
    INSERT INTO
        hidden.groups_counters (id,
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

CREATE OR REPLACE TRIGGER on_auth_user_created_add_groups_counter
    AFTER INSERT
    ON hidden.groups
    FOR EACH ROW
EXECUTE PROCEDURE postgres.create_groups_counter();
