DROP TYPE IF EXISTS hidden.group_level CASCADE;
CREATE TYPE hidden.group_level AS enum ('local', 'regional', 'national');
