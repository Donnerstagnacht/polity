import {supabaseClient} from "../../src/app/auth/supabase-client";
import {POSTGRES_ERRORS} from "../fixtures/postgres_errors";
import {AuthTokenResponse} from "@supabase/supabase-js";
import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;

describe(`Negative api tests for the notifications feature show that `, async (): Promise<void> => {
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
        const response = await supabaseClient
        .rpc('select_unread_notifications_counter', {
            // @ts-ignore
            user_id: TEST_ID
        })
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('an authenticated user can call the follow transaction but can not call it twice', async (): Promise<void> => {
        const response = await supabaseClient
        .rpc('read_notifications_of_users', {
            // @ts-ignore
            user_id: TEST_ID
        })
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })


})
