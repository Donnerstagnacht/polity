-- Creates a "hidden" schema which is not accessible to the client API
-- Thus, these functions are protected
-- and it is ensured that they can only be called by transactions

CREATE SCHEMA IF NOT EXISTS hidden;

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA hidden TO postgres;

GRANT USAGE ON SCHEMA hidden TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA hidden TO authenticated;

