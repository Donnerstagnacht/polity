DROP TYPE IF EXISTS hidden.<%= underscore(name) %> CASCADE;
CREATE TYPE hidden.<%= underscore(name) %> AS enum ('', '', '');
