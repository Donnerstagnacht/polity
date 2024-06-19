import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionStoreService {
    // private session: WritableSignal<AuthSession | null> = signal(null);
    //
    // constructor(
    //     private readonly router: Router
    // ) {
    //     this.setInitialSessionData();
    // }

    /**
     * Returns the session ID of the authenticated user, if available.
     *
     * @return {string | null} The session ID of the user, or null if not available.
     */
    // public getSessionId(): string | null {
    //     if (this.session()?.user.id) {
    //         return this.session()?.user.id as string;
    //     } else {
    //         return null;
    //     }
    // }

    /**
     * Returns the global session that notifies consumers of changes
     *
     * @return WritableSignal<AuthSession | null> - The session or null
     */
    // public selectSession(): WritableSignal<AuthSession | null> {
    //     return this.session;
    // }

    /**
     * Sets a new session and fetches the associated profile data from the database.
     *
     * @param {AuthSession | null} session - The session object.
     * @param {boolean} login - Set to true if app should navigate to the profile page after state is set.
     * @return {Promise<void>}
     */
    // public async setAuthData(session: AuthSession | null, login?: boolean): Promise<void> {
    //     this.session.set(session);
    //
    //     localStorage.setItem('session', JSON.stringify({
    //         session: session
    //     }));
    //     if (login) {
    //         await this.router.navigate(['/profile']);
    //     }
    // }
    //
    // private checkLocalStorageForSessionData(): {
    //     session: AuthSession | null
    // } {
    //     const sessionJson: string | null = localStorage.getItem('session');
    //     if (sessionJson) {
    //         return JSON.parse(sessionJson);
    //     } else {
    //         return {
    //             session: null
    //         };
    //     }
    // }
    //
    // private setInitialSessionData(): void {
    //     const sessionDataFromLocalStorage: {
    //         session: AuthSession | null
    //     } = this.checkLocalStorageForSessionData();
    //     if (sessionDataFromLocalStorage) {
    //         this.session = signal(sessionDataFromLocalStorage.session);
    //     } else {
    //         this.session = signal(null);
    //     }
    // }
}
