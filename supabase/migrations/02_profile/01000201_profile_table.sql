CREATE TABLE IF NOT EXISTS authenticated_access.profiles
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
                                         (first_name || ' ' || last_name))
                                     ) STORED
        CONSTRAINT username_length CHECK (CHAR_LENGTH(username) >= 3)
);

CREATE INDEX profiles_fts ON authenticated_access.profiles USING gin (fts); -- generate the index

ALTER TABLE authenticated_access.profiles
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own profile." ON authenticated_access.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone." ON authenticated_access.profiles
    FOR SELECT USING (TRUE);

CREATE POLICY "Users can update own profile." ON authenticated_access.profiles
    FOR UPDATE USING (auth.uid() = id);
