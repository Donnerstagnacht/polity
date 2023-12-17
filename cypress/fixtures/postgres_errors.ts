/**
 * ERROR dictionary used in this test:
 *
 * data = true or null => transaction successful
 *
 * error codes:
 * 23505: 409  - uniqueness violation, e.g. insert unsuccessful
 * 42703: column does not exist, e.g. delete unsuccessful (custom thrown error)
 * 42501: if authenticated 403, else 401 insufficient privileges, e.g. row-level-security or schema access error
 * PGRST202: 404 - Caused by a stale function signature, otherwise the function may not exist in the database, e.g.
 * api endpoint not public
 * 42P01: 404 - undefined table, e.g. api endpoint not public
 * https://postgrest.org/en/stable/references/errors.html
 **/

export const POSTGRES_ERRORS = {
    unique_violated: '23505',
    column_not_existing: '42703',
    noPermission: '42501',
    function_not_existing: 'PGRST202',
    undefined_table: '42P01'
}
