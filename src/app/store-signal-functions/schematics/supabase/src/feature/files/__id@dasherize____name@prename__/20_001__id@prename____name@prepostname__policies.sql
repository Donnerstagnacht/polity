DROP POLICY IF EXISTS "Users can create <%= underscore(name) %>." ON hidden.<%= underscore(name) %>;
CREATE POLICY "Users can create <%= underscore(name) %>."
    ON hidden.<%= underscore(name) %>
    FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Users can read <%= underscore(name) %>." ON hidden.<%= underscore(name) %>;
CREATE POLICY "Users can read <%= underscore(name) %>."
    ON hidden.<%= underscore(name) %>
    FOR SELECT
    USING (TRUE);

DROP POLICY IF EXISTS "Users can not update <%= underscore(name) %>." ON hidden.<%= underscore(name) %>;
CREATE POLICY "Users can not update <%= underscore(name) %>."
    ON hidden.<%= underscore(name) %>
    FOR UPDATE
    USING (FALSE)
    WITH CHECK (FALSE);

DROP POLICY IF EXISTS "Board members and presidents can update <%= underscore(name) %>."
    ON hidden.<%= underscore(name) %>;
CREATE POLICY "Board members and presidents can update <%= underscore(name) %>."
    ON hidden.<%= underscore(name) %>
    FOR UPDATE
    TO authenticated
    USING (TRUE);
