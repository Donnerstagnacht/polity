import {supabaseClient} from "../../src/app/auth/supabase-client";
import {POSTGRES_ERRORS} from "../fixtures/postgres_errors";
import {AuthTokenResponse} from "@supabase/supabase-js";
import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;

describe(`Negative api tests for the assistant feature show that `, async (): Promise<void> => {
    let user_id: string | undefined;
    let token: string | undefined;
    const TEST_ID: string = otherUser.id;

    beforeEach(async (): Promise<void> => {
        cy.visit('landing/sign-in');
        const response: AuthTokenResponse = await supabaseClient.auth.signInWithPassword(
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
