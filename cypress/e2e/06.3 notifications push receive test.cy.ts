import {ProfileTest} from "../fixtures/profile";
import {userCreatedByCypress} from "../fixtures/user";
import {supabaseClient} from "../../src/app/auth/supabase-client";
import {POSTGRES_ERRORS} from "../fixtures/postgres_errors";

const profile1: ProfileTest = userCreatedByCypress;

describe(`Push tests show that `, async (): Promise<void> => {
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

    it('notifications function can not be accessed by client users', async (): Promise<void> => {
        // TODO test implementation
        const response = await supabaseClient.functions.invoke('hello-world');
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
    })

    it('notifications function can not be called by postgres service role', async (): Promise<void> => {
        // TODO test implementation
        const response = await supabaseClient.functions.invoke('hello-world');
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing)
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
