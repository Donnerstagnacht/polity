-- TODO: rewrite after execute function to correct function call syntax
CREATE OR REPLACE TRIGGER on_new_notification
    AFTER INSERT
    ON authenticated_access.notifications_by_user
    FOR EACH ROW
EXECUTE FUNCTION supabase_functions_admin.http_request(
    'address',
    'POST',
    '{"Content-Type": "application/json"}',
    '{}',
    1000
                 );

-- what about authrorisation header to call edge function
