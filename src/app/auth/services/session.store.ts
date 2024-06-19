import {Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {loadingStarted, LoadingState, loadingStopped} from '../../store-signal-functions/loadingFeature';
import {AuthSession} from '@supabase/supabase-js';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class SessionStore {
    protected loadingState_: WritableSignal<LoadingState> = signal({
        loading: false,
        dataRequested: false
    });
    public loadingState: Signal<LoadingState> = this.loadingState_.asReadonly();
    private data_: WritableSignal<AuthSession | null> = signal(null);

    constructor(private router: Router) {
        this.setInitialSessionData();
    }

    /**
     * Sets a new session and fetches the associated profile data from the database.
     *
     * @param {AuthSession | null} session - The session object.
     * @param {boolean} login - Set to true if app should navigate to the profile page after state is set.
     * @return {Promise<void>}
     */
    public async setAuthData(session: AuthSession | null, login?: boolean): Promise<void> {
        this.data_.set(session);

        localStorage.setItem('session', JSON.stringify({
            session: session
        }));
        if (login) {
            await this.router.navigate(['/profile']);
        }
    }

    public startLoading(): void {
        loadingStarted(
            this.loadingState_
        );
    }

    public stopLoading(): void {
        loadingStopped(
            this.loadingState_
        );
    }

    /**
     * Returns the session ID of the authenticated user, if available.
     *
     * @return {string | null} The session ID of the user, or null if not available.
     */
    public getSessionId(): string | null {
        if (this.data_()?.user.id) {
            return this.data_()?.user.id as string;
        } else {
            return null;
        }
    }

    /**
     * Returns the global session that notifies consumers of changes
     *
     * @return WritableSignal<AuthSession | null> - The session or null
     */
    public selectSession(): WritableSignal<AuthSession | null> {
        return this.data_;
    }


    private checkLocalStorageForSessionData(): {
        session: AuthSession | null
    } {
        const sessionJson: string | null = localStorage.getItem('session');
        if (sessionJson) {
            return JSON.parse(sessionJson);
        } else {
            return {
                session: null
            };
        }
    }

    private setInitialSessionData(): void {
        const sessionDataFromLocalStorage: {
            session: AuthSession | null
        } = this.checkLocalStorageForSessionData();
        if (sessionDataFromLocalStorage) {
            this.data_ = signal(sessionDataFromLocalStorage.session);
        } else {
            this.data_ = signal(null);
        }
    }

}
