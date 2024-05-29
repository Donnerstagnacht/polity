GRANT ALL ON SCHEMA public TO postgres;

GRANT USAGE ON SCHEMA hidden TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA hidden TO authenticated;

GRANT USAGE ON SCHEMA hidden TO postgres, service_role;
GRANT ALL ON SCHEMA hidden TO postgres, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA hidden TO postgres, service_role;
