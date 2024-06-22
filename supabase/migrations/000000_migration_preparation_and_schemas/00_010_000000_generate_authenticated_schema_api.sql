GRANT USAGE ON SCHEMA authenticated TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA authenticated TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA authenticated TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA authenticated TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA authenticated GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA authenticated GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA authenticated GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
