CREATE TABLE IF NOT EXISTS authenticated_access.assistants
(
    id            uuid                                           NOT NULL,
    first_sign_in boolean       DEFAULT TRUE                     NOT NULL,
    skip_tutorial boolean       DEFAULT FALSE                    NOT NULL,
    last_tutorial tutorial_enum DEFAULT 'welcome'::tutorial_enum NOT NULL,
    CONSTRAINT assistants_pkey PRIMARY KEY (id),
    CONSTRAINT assistants_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) MATCH SIMPLE
);

ALTER TABLE authenticated_access.assistants
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public assistants can be followed by by everyone." ON authenticated_access.assistants
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Public assistants are viewable by its owner." ON authenticated_access.assistants
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Public assistants can be updated by its owner." ON authenticated_access.assistants
    FOR UPDATE USING (auth.uid() = id);
