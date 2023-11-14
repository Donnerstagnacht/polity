import {Injectable} from '@angular/core';
import {
    AuthChangeEvent,
    AuthError,
    AuthResponse,
    AuthTokenResponse,
    createClient,
    Session,
    SignInWithPasswordCredentials,
    Subscription,
    SupabaseClient
} from "@supabase/supabase-js";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private readonly supabaseClient: SupabaseClient

    constructor() {
        this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    /**
     * Receive a notification every time an auth event happens.
     *
     * @param {function} callback - The function to be called when an auth event happens.
     * @return { data: { subscription: Subscription }} - An object containing a subscription
     */
    public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): { data: { subscription: Subscription } } {
        return this.supabaseClient.auth.onAuthStateChange(callback)
    }

    /**
     * Sign up a user with the provided credentials e.g. email and password.
     *
     * @param {SignInWithPasswordCredentials} credentials - Email and password used for signing up.
     * @return {Promise<AuthResponse>} - A promise resolving the user data since auto sign-in is turned off.
     */
    public signUp(credentials: SignInWithPasswordCredentials): Promise<AuthResponse> {
        return this.supabaseClient.auth.signUp(credentials);
    }

    /**
     * Sign in a user with password and email.
     *
     * @param {SignInWithPasswordCredentials} credentials - Email and password used for signing in.
     * @return {Promise<AuthTokenResponse>} - A promise resolving user and session/token data.
     */
    public signIn(credentials: SignInWithPasswordCredentials): Promise<AuthTokenResponse> {
        return this.supabaseClient.auth.signInWithPassword(credentials);
    }

    /**
     * Signs out the current user.
     *
     * @return {Promise<{ error: AuthError | null }>} A promise logging out the user from browser session,
     * removing all items from local storage and returning null or returning an AuthError
     */
    public signOut(): Promise<{ error: AuthError | null }> {
        return this.supabaseClient.auth.signOut();
    }
}
