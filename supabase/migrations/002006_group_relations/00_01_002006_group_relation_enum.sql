DROP TYPE IF EXISTS group_relation CASCADE;
CREATE TYPE group_relation AS enum ('child', 'parent', 'sibling');
