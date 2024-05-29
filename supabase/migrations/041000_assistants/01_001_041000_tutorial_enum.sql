DROP TYPE IF EXISTS hidden.tutorial_enum CASCADE;
CREATE TYPE hidden.tutorial_enum AS enum ('welcome', 'profile', 'search');
