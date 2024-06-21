import {supabaseAuthenticatedClient} from '../../src/app/auth/supabase-authenticated-client';
import {POSTGRES_ERRORS} from '../fixtures/postgres_errors';
import {AuthTokenResponse} from '@supabase/supabase-js';
import {AUTH_DATA1, AUTH_DATA2, AuthData} from '../../seed_and_test_data/01_test_auth';

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;

describe(`Negative api tests for profile_counter table show that `, async (): Promise<void> => {
    let user_id: string | undefined;
    let token: string | undefined;
    const TEST_ID: string = otherUser.id;

    before((): void => {
        cy.resetSupabase();
    });

    beforeEach(async (): Promise<void> => {
        const response: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: signedInUserAuth.email,
                password: signedInUserAuth.password
            }
        );
        user_id = response.data.user?.id;
        token = response.data.session?.access_token;
        expect(user_id).to.be.not.null;
        expect(token).to.be.not.null;
    });

    it('a non authenticated user can not update a profile', async (): Promise<void> => {
        await supabaseAuthenticatedClient.auth.signOut();

        const response = await supabaseAuthenticatedClient
        .rpc('profiles_update');
        expect(response.data).to.be.null;
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.noPermission);
    });

    it('an authenticated user can only update its own profile', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('profiles_update', {_first_name: TEST_ID});
        expect(response.data).to.be.null;
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.function_not_existing);
    });

    it('a non authenticated user can not view profiles', async (): Promise<void> => {
        await supabaseAuthenticatedClient.auth.signOut();
        const response = await supabaseAuthenticatedClient
        .rpc('profiles_read', {_user_id: TEST_ID});
        expect(response.data).to.be.null;
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.noPermission);
    });
});
