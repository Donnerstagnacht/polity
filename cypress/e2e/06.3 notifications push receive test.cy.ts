import {supabasePublicClient} from "../../src/app/auth/supabase-public-client";
import {AuthTokenResponse} from "@supabase/supabase-js";
import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;

describe(`Push tests show that `, async (): Promise<void> => {
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

    it('notifications function can not be accessed by client users', async (): Promise<void> => {
        // TODO test implementation
        // const response = await supabaseClient.functions.invoke('hello-world');
        // expect(response.data).to.be.null
        // expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('notifications function can not be called by postgres service role', async (): Promise<void> => {
        // TODO test implementation
        // const response = await supabaseClient.functions.invoke('hello-world');
        // expect(response.data).to.be.null
        // expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
        // add secret env service role key variable
    })

    it('native browser notifications can be received in edge', async (): Promise<void> => {
        // TODO test implementation
    })

    it('native browser notifications can be received in chrome', async (): Promise<void> => {
        // TODO test implementation
    })

    it('native browser notifications can be received in firefox', async (): Promise<void> => {
        // TODO test implementation
    })

    it('native browser notifications can be received in safari', async (): Promise<void> => {
        // TODO test implementation
    })
})
