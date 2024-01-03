import {Injectable} from '@angular/core';
import {
    AuthChangeEvent,
    AuthError,
    AuthResponse,
    AuthTokenResponse,
    Session,
    SignInWithPasswordCredentials,
    Subscription,
    SupabaseClient,
    User,
    UserResponse
} from "@supabase/supabase-js";
import {SessionStoreService} from "./session.store.service";
import {Router} from "@angular/router";
import {DatabaseOverwritten} from "../../../../supabase/types/supabase.modified";
import {ErrorStoreService} from "../../signal-store/error-store.service";
import {supabaseClient} from "../supabase-client";
import {TuiAlertService} from "@taiga-ui/core";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly notificationService: ErrorStoreService,
        private readonly sessionStoreService: SessionStoreService,
        private readonly tuiAlertService: TuiAlertService,
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
            this.sessionStoreService.loading.startLoading()
            const authResponse: AuthResponse = await this.supabaseClient.auth.signUp(credentials);
            if (authResponse.error) {
                throw authResponse.error
            }
            await this.router.navigate(['/landing/sign-in'])
            return authResponse;
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateError(error.message, true)
            }
            return error
        } finally {
            this.sessionStoreService.loading.stopLoading()
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
            this.sessionStoreService.loading.startLoading()
            const authResponse: AuthTokenResponse = await this.supabaseClient.auth.signInWithPassword(credentials);

            if (authResponse.error) {
                throw authResponse.error
            }
            await this.sessionStoreService.setAuthData(authResponse.data.session)
            await this.router.navigate(['/profile', authResponse.data.session.user.id]);
            return authResponse;
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateError(error.message, true);
                return error
            }
            return error
        } finally {
            this.sessionStoreService.loading.stopLoading()
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
            this.sessionStoreService.loading.startLoading()
            this.supabaseClient.removeAllChannels()
            const authResponse: { error: AuthError | null } = await this.supabaseClient.auth.signOut();
            if (authResponse.error) {
                throw authResponse.error;
            }
            await this.router.navigate(['/landing/sign-in']);
            return authResponse
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateError(error.message, true);
            }
            return error
        } finally {
            this.sessionStoreService.loading.stopLoading()
        }
    }

    /**
     * Updates the email of the user.
     *
     * @param {string} newEmail - The new email address to update.
     * @return {Promise<{ user: User } | unknown>} - A promise that resolves to an an object containing the updated user data or an unknown error.
     */
    public async updateEmail(newEmail: string): Promise<{ user: User } | unknown> {
        try {
            this.sessionStoreService.loading.startLoading()
            const userResponse: UserResponse = await this.supabaseClient.auth.updateUser({email: newEmail})
            if (userResponse.error) {
                throw userResponse.error;
            }
            this.tuiAlertService.open(
                'Email erfolgreich geändert. Die Änderung muss in der Alten und Neuen Email-Adresse bestätigt werden' +
                ' und wird dann beim nächsten Login benötigt.',
                {
                    status: 'success',
                }).subscribe()
            return userResponse.data;
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateError(error.message, true);
            }
            return error;
        } finally {
            this.sessionStoreService.loading.stopLoading()
        }
    }

    /**
     * Updates the password of the current user.
     *
     * @param {string} newPassword - The new password to be set.
     * @returns {Promise<{ user: User } | unknown>} A Promise that resolves to either an object containing the
     * updated user data or an unknown error.
     */
    public async updatePassword(newPassword: string): Promise<{ user: User } | unknown> {
        try {
            this.sessionStoreService.loading.startLoading()
            const userResponse: UserResponse = await this.supabaseClient.auth.updateUser({password: newPassword})
            if (userResponse.error) {
                throw userResponse.error;
            }
            this.tuiAlertService.open(
                'Passwort erfolgreich geändert und beim nächsten Login benötigt.',
                {
                    status: 'success',
                }).subscribe()
            return userResponse.data;
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateError(error.message, true);
            }
            return error;
        } finally {
            this.sessionStoreService.loading.stopLoading()
        }
    }

    /**
     * Requests a password reset for the given email address.
     *
     * @param {string} emailResetShouldBeSend - The email address to send the password reset to.
     * @returns {Promise<any>} - A Promise that resolves to the response data, or rejects with an error.
     */
    public async requestPasswordReset(emailResetShouldBeSend: string): Promise<any> {
        try {
            this.sessionStoreService.loading.startLoading()
            const userResponse: { data: {}; error: null } | {
                data: null;
                error: AuthError
            } = await this.supabaseClient.auth.resetPasswordForEmail(
                emailResetShouldBeSend,
                {redirectTo: 'http://localhost:4200/landing/reset-password'}
            )
            if (userResponse.error) {
                throw userResponse.error;
            }
            this.tuiAlertService.open(
                'Email erfolgreich versendet. Öffne deinen Email Account.',
                {
                    status: 'success',
                }).subscribe()
            return userResponse.data;
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateError(error.message, true);
            }
            return error;
        } finally {
            this.sessionStoreService.loading.stopLoading()
        }
    }
}
