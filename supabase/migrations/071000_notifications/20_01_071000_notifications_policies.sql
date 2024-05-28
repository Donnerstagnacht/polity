CREATE POLICY "Public notifications_by_user can be created by by everyone." ON authenticated_access.notifications_by_user
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Public notifications_by_user can be read by their receiver." ON authenticated_access.notifications_by_user
    FOR SELECT USING (auth.uid() = receiver);

