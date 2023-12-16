import {supabaseClient} from "../../src/app/auth/supabase-client";

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
    const testId = '42e58ca1-2eb8-4651-93c2-cefba2e32f42';

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
                following_id: testId,
            },
        )
        expect(response.data).to.be.null
        expect(response.error).to.be.null

        const response2 = await supabaseClient
        .rpc('follow_transaction',
            {
                following_id: testId,
            },
        )
        expect(response2.data).to.be.null
        expect(response2.error?.code).to.be.equal('23505')

    })

    it('an authenticated user can call the unfollow transaction but can not call it twice', async (): Promise<void> => {
        const response = await supabaseClient
        .rpc('unfollow_transaction',
            {
                following_id: testId,
            },
        )
        expect(response.data).to.be.null
        expect(response.error).to.be.null

        const response2 = await supabaseClient
        .rpc('unfollow_transaction',
            {
                following_id: testId,
            },
        )
        expect(response2.data).to.be.null
        expect(response2.error?.code).to.be.equal('42703')
    })

    it('a non authenticated user can not call the follow transaction', async (): Promise<void> => {
        await supabaseClient.auth.signOut()

        const response = await supabaseClient
        .rpc('follow_transaction',
            {
                following_id: testId,
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal('42501')
    })

    it('a non authenticated user can not execute the unfollow transaction', async (): Promise<void> => {
        await supabaseClient.auth.signOut()

        const response = await supabaseClient
        .rpc('unfollow_transaction',
            {
                following_id: testId,
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal('42501')
    })

    it('the profile_counter following increment function is not publicly available', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('increment_following_counter', {user_id: testId})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal('PGRST202')
    })

    it('the profile_counter following decrement function is not publicly available', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('decrement_following_counter', {user_id: testId})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal('PGRST202')
    })

    it('the profile_counter follower increment function is not publicly available', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('increment_follower_counter', {user_id: testId})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal('PGRST202')
    })

    it('the profile_counter follower decrement function is not publicly available', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('decrement_follower_counter', {user_id: testId})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal('PGRST202')
    })

    it('the insert_following_follower_relationship function is not publicly available', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('insert_following_follower_relationship', {user_id: testId})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal('PGRST202')
    })

    it('the delete_following_follower_relationship function is not publicly available', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('delete_following_follower_relationship', {user_id: testId})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal('PGRST202')
    })

    it('the profile_counter api table not public selectable', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .from('profiles_counters')
        .select('')
        .eq('id', testId)
        .single();
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal('42P01')
    })

    it('the following_profiles api table not public selectable', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .from('following_profiles')
        .select('')
        .eq('id', testId)
        .single();
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal('42P01')
    })
})
