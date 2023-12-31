-- TODO: remove Bearer Key
CREATE OR REPLACE TRIGGER "send-push-hook"
    AFTER INSERT
    ON authenticated_access.notifications_by_user
    FOR EACH ROW
EXECUTE FUNCTION supabase_functions.http_request(
    'https://abcwkgkiztruxwvfwabf.supabase.co/functions/v1/send-push-notification',
    'POST',
    '{
      "Content-Type":"application/json",
      "Authorization": "Bearer <your Role Level security Key>"
      }',
    '{}',
    '1000'
                 );
