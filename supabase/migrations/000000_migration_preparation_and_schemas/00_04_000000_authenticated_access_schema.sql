-- Creates a "authenticated_access" schema which is not accessible to the client API
-- Thus, these functions are protected
-- and it is ensured that they can only be called by transactions

CREATE SCHEMA IF NOT EXISTS authenticated_access;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA authenticated_access TO postgres;

GRANT USAGE ON SCHEMA authenticated_access TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA authenticated_access TO authenticated;

