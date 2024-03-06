import {Size, Sizes} from "../fixtures/size";
import {supabaseClient} from "../../src/app/auth/supabase-client";
import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";
import {AuthTokenResponse} from "@supabase/supabase-js";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;

Sizes.forEach((size: Size): void => {
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

        it('an authenticated user can call the create group transaction', async (): Promise<void> => {
            // TODO test implementation
        })

        it('a non authenticated user calling the create group transaction should return an error.', async (): Promise<void> => {
            // TODO test implementation
        })

        it('two calls to the create group transaction with the same payload should return an error on the second' +
            ' call.', async (): Promise<void> => {
            // TODO test implementation
        })
    })
});
