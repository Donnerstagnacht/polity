import {supabaseClient} from "../../src/app/auth/supabase-client";
import {POSTGRES_ERRORS} from "../fixtures/postgres_errors";

describe(`Negative api tests for profile_counter table show that `, async () => {
    let user_id: string | undefined;
    let token: string | undefined;
    const TEST_ID = '42e58ca1-2eb8-4651-93c2-cefba2e32f42';

    beforeEach(async (): Promise<void> => {
        cy.visit('landing/sign-in');
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

    it('an authenticated user can only view its own assistant.', async (): Promise<void> => {
        const response = await supabaseClient
        // @ts-ignore
        .rpc('select_assistant', {user_id: TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('an authenticated user can only update its own first_sign_in status.', async (): Promise<void> => {
        const response = await supabaseClient
        .rpc('update_first_sign_in', {
            new_status: false,
            // @ts-ignore
            user_id: TEST_ID
        })
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('an authenticated user can only update its own last_tutorial status.', async (): Promise<void> => {
        const response = await supabaseClient
        .rpc('update_last_tutorial', {
            new_status: 'welcome',
            // @ts-ignore
            user_id: TEST_ID
        })
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('an authenticated user can only update its own skip_tutorial status.', async (): Promise<void> => {
        const response = await supabaseClient
        .rpc('update_skip_tutorial', {
            new_status: true,
            // @ts-ignore
            user_id: TEST_ID
        })
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })
})
