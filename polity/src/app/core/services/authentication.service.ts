import {Injectable} from '@angular/core';
import {
    AuthChangeEvent,
    AuthError,
    AuthResponse,
    AuthTokenResponse,
    Session,
    SignInWithPasswordCredentials,
    Subscription,
    SupabaseClient
} from "@supabase/supabase-js";
import {UiStoreService} from "./ui-store.service";
import {NotificationsStoreService} from "./notifications-store.service";
import {SessionStoreService} from "./session-store.service";
import {Router} from "@angular/router";
import {supabaseClient} from "./supabase-client";
import {Database} from "../../../../supabase/types/types";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private readonly supabaseClient: SupabaseClient<Database> = supabaseClient;

    constructor(
        private readonly UIStoreService: UiStoreService,
        private readonly notificationService: NotificationsStoreService,
        private readonly sessionStoreService: SessionStoreService,
        private readonly router: Router
    ) {
    }

    /**
     * Receive a notification every time an auth event happens.
     *
     * @param {function} callback - The function to be called when an auth event happens.
     * @return { data: { subscription: Subscription }} - An object containing a subscription
     */
    public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): {
        data: { subscription: Subscription }
    } {
        return this.supabaseClient.auth.onAuthStateChange(callback)
    }

    /**
     * Sign up a user with the provided credentials e.g. email and password.
     *
     * @param {SignInWithPasswordCredentials} credentials - Email and password used for signing up.
     * @return {Promise<AuthResponse>} - A promise resolving the user data since auto sign-in is turned off.
     */
    public async signUp(credentials: SignInWithPasswordCredentials): Promise<AuthResponse | Error | unknown> {
        try {
            this.UIStoreService.setLoading(true)
            const authResponse: AuthResponse = await this.supabaseClient.auth.signUp(credentials);
            if (authResponse.error) {
                throw authResponse.error
            }
            await this.router.navigate(['/landing/sign-in'])
            return authResponse;
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateNotification(error.message, true)
            }
            return error
        } finally {
            this.UIStoreService.setLoading(false)
        }
    }

    /**
     * Sign in a user with password and email. Stores the user session in sessionStore. If successful, returns the
     * AuthTokenResponse. Else it returns the AuthError.
     *
     * @param {SignInWithPasswordCredentials} credentials - Email and password used for signing in.
     * @return {Promise<AuthTokenResponse | Error | unknown>}
     */
    public async signIn(credentials: SignInWithPasswordCredentials): Promise<AuthTokenResponse | Error | unknown> {
        try {
            this.UIStoreService.setLoading(true)
            const authResponse: AuthTokenResponse = await this.supabaseClient.auth.signInWithPassword(credentials);

            if (authResponse.error) {
                throw authResponse.error
            }
            await this.sessionStoreService.setAuthData(authResponse.data.session)
            await this.router.navigate(['/profile', authResponse.data.session.user.id]);
            return authResponse;
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateNotification(error.message, true);
                return error
            }
            return error
        } finally {
            this.UIStoreService.setLoading(false)
        }
    }

    /**
     * Signs out the current user. If successful, removes all items from local storage and returns null. Else it
     * returns the AuthError.
     *
     * @return {Promise<{ error: AuthError | null }>}
     */
    public async signOut(): Promise<{ error: AuthError | null } | unknown> {
        try {
            this.UIStoreService.setLoading(true)
            const authResponse: { error: AuthError | null } = await this.supabaseClient.auth.signOut();
            if (authResponse.error) {
                throw authResponse.error;
            }
            await this.router.navigate(['/landing/sign-in']);
            return authResponse
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateNotification(error.message, true);
            }
            return error
        } finally {
            this.UIStoreService.setLoading(false)
        }
    }
}
