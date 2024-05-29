CREATE TABLE IF NOT EXISTS hidden.profiles
(
    id                           uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
    updated_at                   timestamp WITH TIME ZONE,
    username                     text UNIQUE,
    first_name                   text,
    last_name                    text,
    profile_image                text,
    receive_follow_notifications boolean DEFAULT TRUE       NOT NULL,
    fts                          tsvector GENERATED ALWAYS AS (
                                     TO_TSVECTOR(
                                         'german',
                                         (first_name || ' ' || last_name)
                                     )
                                     ) STORED
        CONSTRAINT username_length CHECK (CHAR_LENGTH(username) >= 3)
);

CREATE INDEX profiles_fts ON hidden.profiles USING gin (fts); -- generate the index

ALTER TABLE hidden.profiles
    ENABLE ROW LEVEL SECURITY;
