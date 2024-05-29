CREATE TABLE IF NOT EXISTS hidden.assistants
(
    id            uuid                                           NOT NULL,
    first_sign_in boolean       DEFAULT TRUE                     NOT NULL,
    skip_tutorial boolean       DEFAULT FALSE                    NOT NULL,
    last_tutorial tutorial_enum DEFAULT 'welcome'::tutorial_enum NOT NULL,
    CONSTRAINT assistants_pkey PRIMARY KEY (id),
    CONSTRAINT assistants_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) MATCH SIMPLE
);

ALTER TABLE hidden.assistants
    ENABLE ROW LEVEL SECURITY;
