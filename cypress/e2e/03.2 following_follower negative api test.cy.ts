import {supabaseClient} from "../../src/app/auth/supabase-client";
import {POSTGRES_ERRORS} from "../fixtures/postgres_errors";

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

describe(`Negative api tests for profile_counter table show that `, async () => {
    let user_id: string | undefined;
    let token: string | undefined;
    const TEST_ID = '42e58ca1-2eb8-4651-93c2-cefba2e32f42';

    beforeEach(async (): Promise<void> => {
        const response = await supabaseClient.auth.signInWithPassword(
            {
                email: 'follow@seed.com',
                password: '12345678',
            }
        )
        user_id = response.data.user?.id
        token = response.data.session?.access_token
        expect(user_id).to.be.not.null
        expect(token).to.be.not.null
    })

    it('an authenticated user can call the follow transaction but can not call it twice', async (): Promise<void> => {
        const response = await supabaseClient
        .rpc('follow_transaction',
            {
                following_id: TEST_ID,
            },
        )
        expect(response.data).to.be.null
        expect(response.error).to.be.null

        const response2 = await supabaseClient
        .rpc('follow_transaction',
            {
                following_id: TEST_ID,
            },
        )
        expect(response2.data).to.be.null
        expect(response2.error?.code).to.be.equal(POSTGRES_ERRORS.unique_violated)

    })

    it('an authenticated user can call the unfollow transaction but can not call it twice', async (): Promise<void> => {
        const response = await supabaseClient
        .rpc('unfollow_transaction',
            {
                following_id: TEST_ID,
            },
        )
        expect(response.data).to.be.null
        expect(response.error).to.be.null

        const response2 = await supabaseClient
        .rpc('unfollow_transaction',
            {
                following_id: TEST_ID,
            },
        )
        expect(response2.data).to.be.null
        expect(response2.error?.code).to.be.equal(POSTGRES_ERRORS.column_not_existing)
    })

    it('a non authenticated user can not call the follow transaction', async (): Promise<void> => {
        await supabaseClient.auth.signOut()

        const response = await supabaseClient
        .rpc('follow_transaction',
            {
                following_id: TEST_ID,
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.noPermission)
    })

    it('a non authenticated user can not execute the unfollow transaction', async (): Promise<void> => {
        await supabaseClient.auth.signOut()

        const response = await supabaseClient
        .rpc('unfollow_transaction',
            {
                following_id: TEST_ID,
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.noPermission)
    })

    it('the profile_counter following increment function is not publicly available', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('increment_following_counter', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('the profile_counter following decrement function is not publicly available', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('decrement_following_counter', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('the profile_counter follower increment function is not publicly available', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('increment_follower_counter', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('the profile_counter follower decrement function is not publicly available', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('decrement_follower_counter', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('the insert_following_follower_relationship function is not publicly available', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('insert_following_follower_relationship', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('the delete_following_follower_relationship function is not publicly available', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('delete_following_follower_relationship', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('the profile_counter api table not public selectable', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .from('profiles_counters')
        .select('')
        .eq('id', TEST_ID)
        .single();
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.undefined_table)
    })

    it('the following_profiles api table not public selectable', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .from('following_profiles')
        .select('')
        .eq('id', TEST_ID)
        .single();
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.undefined_table)
    })

    it('an authenticated user only checks if he follows a user and not if other user follow each other', async (): Promise<void> => {
        const response = await supabaseClient
        .rpc('check_if_following',
            {
                following_id: TEST_ID,
                // @ts-ignore
                userid: TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('an authenticated user can only view its own followings', async (): Promise<void> => {
        const response = await supabaseClient
        .rpc('select_following_of_user',
            {
                // @ts-ignore
                userid: TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('an authenticated user can only view its own follower', async (): Promise<void> => {
        const response = await supabaseClient
        .rpc('select_follower_of_user',
            {
                // @ts-ignore
                userid: TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('a non authenticated user can not view counters', async (): Promise<void> => {
        supabaseClient.auth.signOut()

        const response = await supabaseClient
        .rpc('select_following_counter',
            {
                user_id: TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.noPermission)
    })

    it('an authenticated user can only update its own receive_notification status.', async (): Promise<void> => {
        const response = await supabaseClient
        .rpc('update_receive_notifications_from_follow',
            {
                // @ts-ignore
                user_id: TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })
})
