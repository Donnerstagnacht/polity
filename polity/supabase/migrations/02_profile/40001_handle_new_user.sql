CREATE OR REPLACE FUNCTION
    public.create_profile()
    RETURNS trigger AS
$$
BEGIN
    INSERT INTO
        public.profiles (id,
                         full_name,
                         avatar_url)
    VALUES
        (new.id,
         new.raw_user_meta_data ->> 'full_name',
         new.raw_user_meta_data ->> 'avatar_url');
    RETURN new;
END;
$$ LANGUAGE plpgsql
    SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created_add_profile
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
EXECUTE PROCEDURE public.create_profile()
