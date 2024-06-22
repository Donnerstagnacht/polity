CREATE SCHEMA IF NOT EXISTS authenticated;

GRANT ALL ON SCHEMA authenticated TO postgres;

GRANT USAGE ON SCHEMA authenticated TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA authenticated TO authenticated;
