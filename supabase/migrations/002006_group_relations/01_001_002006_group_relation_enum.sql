DROP TYPE IF EXISTS hidden.group_relation CASCADE;
CREATE TYPE hidden.group_relation AS enum ('child', 'parent', 'sibling');
