-- Set up Storage!
INSERT INTO
    storage.buckets (id, name, public)
VALUES
    ('profile_images', 'profile_images', TRUE);

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
DROP POLICY IF EXISTS "Profile images are publicly accessible." ON storage.objects;
CREATE POLICY "Profile images are publicly accessible." ON storage.objects
    FOR SELECT USING (bucket_id = 'profile_images');

DROP POLICY IF EXISTS "Anyone can upload an profile_image." ON storage.objects;
CREATE POLICY "Anyone can upload an profile_image." ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'profile_images');

DROP POLICY IF EXISTS "Users can update their own profile_image." ON storage.objects;
CREATE POLICY "Users can update their own profile_image." ON storage.objects
    FOR UPDATE USING (auth.uid() = owner) WITH CHECK (bucket_id = 'profile_images');
