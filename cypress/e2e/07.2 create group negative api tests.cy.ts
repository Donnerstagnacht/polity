import {supabasePublicClient} from "../../src/app/auth/supabase-public-client";
import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";
import {AuthTokenResponse} from "@supabase/supabase-js";
import {POSTGRES_ERRORS} from "../fixtures/postgres_errors";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;

describe(`Negative api tests for profile_counter table show that `, async (): Promise<void> => {
    let user_id: string | undefined;
    let token: string | undefined;
    const TEST_ID: string = otherUser.id;

    beforeEach(async (): Promise<void> => {
        const response: AuthTokenResponse = await supabasePublicClient.auth.signInWithPassword(
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

    it('a non authenticated user calling the create group transaction should return an error.', async (): Promise<void> => {
        await supabasePublicClient.auth.signOut()

        const response = await supabasePublicClient
        .rpc('create_group_transaction',
            {
                name: "test",
                description: "test",
                level: "regional",
                invited_members: [TEST_ID]
            })
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.noPermission)
    })

    // it('two calls to the create group transaction with the same payload should return an error on the second' +
    //     ' call.', async (): Promise<void> => {
    //     // TODO test implementation / unique name feature implementation missing
    // })
});
