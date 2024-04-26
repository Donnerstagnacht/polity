DROP TYPE IF EXISTS group_level CASCADE;
CREATE TYPE group_level AS enum ('local', 'regional', 'federal');
