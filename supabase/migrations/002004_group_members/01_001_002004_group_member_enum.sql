DROP TYPE IF EXISTS hidden.group_member CASCADE;
CREATE TYPE hidden.group_member AS enum ('member', 'board_member', 'board_president');
