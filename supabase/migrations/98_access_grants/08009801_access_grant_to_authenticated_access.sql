GRANT ALL ON SCHEMA public TO postgres;

GRANT USAGE ON SCHEMA authenticated_access TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA authenticated_access TO authenticated;

GRANT USAGE ON SCHEMA authenticated_access TO postgres, service_role;
GRANT ALL ON SCHEMA authenticated_access TO postgres, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA authenticated_access TO postgres, service_role;
