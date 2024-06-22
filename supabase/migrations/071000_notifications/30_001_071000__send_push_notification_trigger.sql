-- TODO: remove Bearer Key
CREATE OR REPLACE TRIGGER "send-push-hook"
    AFTER INSERT
    ON hidden.notifications_by_user
    FOR EACH ROW
EXECUTE FUNCTION supabase_functions.http_request(
    'https://rjljgqxktntquuftngcf.supabase.co/functions/v1/send-push-notification',
    'POST',
    '{
      "Content-Type":"application/json",
      "Authorization": "Bearer <service role key>"
      }',
    '{}',
    '1000'
                 );
