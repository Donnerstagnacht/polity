CREATE OR REPLACE FUNCTION
	public.create_profile()
	RETURNS trigger AS
$$
BEGIN
	INSERT INTO
		public.profiles (id)
	VALUES
		(new.id);
	RETURN new;
END;
$$ LANGUAGE plpgsql
	SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created_add_profile
	AFTER INSERT
	ON auth.users
	FOR EACH ROW
EXECUTE PROCEDURE public.create_profile()
