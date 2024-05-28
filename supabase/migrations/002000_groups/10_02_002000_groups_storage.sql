-- Set up Storage!
INSERT INTO
    storage.buckets (id,
                     name,
                     public)
VALUES
    ('group_images',
     'group_images',
     FALSE);
