import {Size, Sizes} from "../fixtures/size";
import {supabaseClient} from "../../src/app/auth/supabase-client";
import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";
import {AuthTokenResponse} from "@supabase/supabase-js";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;

Sizes.forEach((size: Size): void => {
    describe(`Feature tests with screen size ${size.width} show that users can `, (): void => {
        before((): void => {

        })

        beforeEach((): void => {
            cy.resetSupabase()
            cy.viewport(size.width, size.height)
            cy.visit('landing/sign-in');
            cy.signIn(signedInUserAuth);
        })
    })
});

describe(`Negative api tests for profile_counter table show that `, async (): Promise<void> => {
    let user_id: string | undefined;
    let token: string | undefined;
    const TEST_ID: string = otherUser.id;

    beforeEach(async (): Promise<void> => {
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

    it('an authenticated user can call the follow transaction but can not call it twice', async (): Promise<void> => {
        // TODO test implementation
    })
})
