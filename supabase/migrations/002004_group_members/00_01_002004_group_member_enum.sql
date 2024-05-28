DROP TYPE IF EXISTS group_member CASCADE;
CREATE TYPE group_member AS enum ('member', 'board_member', 'board_president');
