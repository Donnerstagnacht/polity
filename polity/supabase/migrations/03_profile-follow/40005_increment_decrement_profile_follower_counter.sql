DROP FUNCTION IF EXISTS hidden_functions.increment_follower_counter(user_id uuid);
CREATE OR REPLACE FUNCTION hidden_functions.increment_follower_counter(user_id uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    UPDATE public.profiles_counters
    SET
        follower_counter = follower_counter + 1
    WHERE
        id = user_id;
END
$$;

DROP FUNCTION IF EXISTS hidden_functions.decrement_follower_counter(user_id uuid);
CREATE OR REPLACE FUNCTION hidden_functions.decrement_follower_counter(user_id uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY INVOKER
AS
$$
BEGIN
    UPDATE public.profiles_counters
    SET
        follower_counter = follower_counter - 1
    WHERE
        id = user_id;
END;
$$;
