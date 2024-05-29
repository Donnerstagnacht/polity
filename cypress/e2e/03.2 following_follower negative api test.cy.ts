import {supabaseAuthenticatedClient} from "../../src/app/auth/supabase-authenticated-client";
import {POSTGRES_ERRORS} from "../fixtures/postgres_errors";
import {AuthTokenResponse} from "@supabase/supabase-js";
import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;

describe(`Negative api tests for the following feature show that `, async (): Promise<void> => {
    let user_id: string | undefined;
    let token: string | undefined;
    const TEST_ID: string = otherUser.id;

    beforeEach(async (): Promise<void> => {
        const response: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: signedInUserAuth.email,
                password: signedInUserAuth.password,
            }
        )
        user_id = response.data.user?.id
        token = response.data.session?.access_token
        expect(user_id).to.be.not.null
        expect(token).to.be.not.null
    })

    it('an authenticated user can call the follow transaction but can not call it twice', async (): Promise<void> => {
        cy.resetSupabase()
        const response = await supabaseAuthenticatedClient
        .rpc('follow_transaction',
            {
                following_id: TEST_ID,
            },
        )
        expect(response.data).to.be.null
        expect(response.error).to.be.null

        const response2 = await supabaseAuthenticatedClient
        .rpc('follow_transaction',
            {
                following_id: TEST_ID,
            },
        )
        expect(response2.data).to.be.null
        expect(response2.error?.code).to.be.equal(POSTGRES_ERRORS.unique_violated)

    })

    it('an authenticated user can call the unfollow transaction but can not call it twice', async (): Promise<void> => {
        cy.resetSupabase()
        const response = await supabaseAuthenticatedClient
        .rpc('unfollow_transaction',
            {
                following_id: TEST_ID,
            },
        )
        expect(response.data).to.be.null
        expect(response.error).to.be.null

        const response2 = await supabaseAuthenticatedClient
        .rpc('unfollow_transaction',
            {
                following_id: TEST_ID,
            },
        )
        expect(response2.data).to.be.null
        expect(response2.error?.code).to.be.equal(POSTGRES_ERRORS.column_not_existing)
    })

    it('a non authenticated user can not call the follow transaction', async (): Promise<void> => {
        await supabaseAuthenticatedClient.auth.signOut()

        const response = await supabaseAuthenticatedClient
        .rpc('follow_transaction',
            {
                following_id: TEST_ID,
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.noPermission)
    })

    it('a non authenticated user can not execute the unfollow transaction', async (): Promise<void> => {
        await supabaseAuthenticatedClient.auth.signOut()

        const response = await supabaseAuthenticatedClient
        .rpc('unfollow_transaction',
            {
                following_id: TEST_ID,
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.noPermission)
    })

    it('the profile_counter following increment function is not publicly available', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .rpc('increment_following_counter', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('the profile_counter following decrement function is not publicly available', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .rpc('decrement_following_counter', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('the profile_counter follower increment function is not publicly available', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .rpc('increment_follower_counter', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('the profile_counter follower decrement function is not publicly available', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .rpc('decrement_follower_counter', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('the insert_following_follower_relationship function is not publicly available', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .rpc('insert_following_follower_relationship', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('the delete_following_follower_relationship function is not publicly available', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .rpc('delete_following_follower_relationship', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('the profile_counter api table not public selectable', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .from('profiles_counters')
        .select('')
        .eq('id', TEST_ID)
        .single();
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.undefined_table)
    })

    it('the following_profiles api table not public selectable', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .from('following_profiles')
        .select('')
        .eq('id', TEST_ID)
        .single();
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.undefined_table)
    })

    it('an authenticated user only checks if he follows a user and not if other user follow each other', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('check_if_following',
            {
                following_id: TEST_ID,
                // @ts-ignore
                userid: TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('an authenticated user can only view its own followings', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('read_following_of_user',
            {
                // @ts-ignore
                userid: TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('an authenticated user can only view its own follower', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('read_follower_of_user',
            {
                // @ts-ignore
                userid: TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('a non authenticated user can not view counters', async (): Promise<void> => {
        supabaseAuthenticatedClient.auth.signOut()

        const response = await supabaseAuthenticatedClient
        .rpc('read_profile_counters',
            {
                user_id: TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('an authenticated user can only update its own receive_notification status.', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('update_receive_notifications_from_follow',
            {
                // @ts-ignore
                user_id: TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })
})
