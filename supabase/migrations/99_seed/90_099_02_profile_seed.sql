--Updating seeded profiles
UPDATE public.profiles
SET
    first_name = 'Fabian',
    last_name  = 'Bäcker'
WHERE
    id = '42e58ca1-2eb8-4651-93c2-cefba2e32f42';

UPDATE public.profiles_counters
SET
    follower_counter  = 1,
    following_counter = 2
WHERE
    id = '42e58ca1-2eb8-4651-93c2-cefba2e32f42';


UPDATE public.profiles
SET
    first_name = 'Tobias',
    last_name  = 'Müller'
WHERE
    id = 'f8b028b8-231b-4c80-abf2-7ca787fe686f';

UPDATE public.profiles_counters
SET
    follower_counter  = 1,
    following_counter = 2
WHERE
    id = 'f8b028b8-231b-4c80-abf2-7ca787fe686f';


UPDATE public.profiles
SET
    first_name = 'Lars',
    last_name  = 'Berg'
WHERE
    id = '5615fd53-5b0f-49ce-b242-73677ad547ec';

UPDATE public.profiles_counters
SET
    follower_counter  = 1,
    following_counter = 2
WHERE
    id = '5615fd53-5b0f-49ce-b242-73677ad547ec';



UPDATE public.profiles
SET
    first_name = 'Jana',
    last_name  = 'Klein'
WHERE
    id = 'd5d41bd8-ca96-4583-a0f8-61a34c6dddaa';

UPDATE public.profiles_counters
SET
    follower_counter  = 1,
    following_counter = 2
WHERE
    id = 'd5d41bd8-ca96-4583-a0f8-61a34c6dddaa';


UPDATE public.profiles
SET
    first_name = 'Lennart',
    last_name  = 'Lieb'
WHERE
    id = 'b6febbc9-aaf9-42a5-b6df-082fafe5937f';

UPDATE public.profiles_counters
SET
    follower_counter  = 1,
    following_counter = 2
WHERE
    id = 'b6febbc9-aaf9-42a5-b6df-082fafe5937f';



