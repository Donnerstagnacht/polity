DROP POLICY IF EXISTS "Group images are accessible for authenticated users." ON storage.objects;
CREATE POLICY "Group images are accessible for authenticated users."
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'group_images');

DROP POLICY IF EXISTS "Authenticated users can upload a group wiki image." ON storage.objects;
CREATE POLICY "Authenticated users can upload a group wiki image."
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'group_images');
