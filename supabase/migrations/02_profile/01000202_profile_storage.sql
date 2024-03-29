-- Set up Storage!
INSERT INTO
    storage.buckets (id,
                     name,
                     public)
VALUES
    ('profile_images',
     'profile_images',
     FALSE);

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
DROP POLICY IF EXISTS "Profile images are accessible for authenticated users." ON storage.objects;
CREATE POLICY "Profile images are accessible for authenticated users."
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'profile_images');

DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
CREATE POLICY "Authenticated users can upload images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'profile_images');
