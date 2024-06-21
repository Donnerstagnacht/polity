DROP POLICY IF EXISTS "Profile images are accessible for authenticated users." ON storage.objects;
CREATE POLICY "Profile images are accessible for authenticated users."
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (
    bucket_id = 'profile_images'
    );

DROP POLICY IF EXISTS "Authenticated users can upload a profile wiki image." ON storage.objects;
CREATE POLICY "Authenticated users can upload a profile wiki image."
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
    bucket_id = 'profile_images'
    );
