import {CanActivateFn, Router} from '@angular/router';
import {inject, Signal} from '@angular/core';
import {Session} from '@supabase/supabase-js';
import {SessionStore} from './services/session.store';

/**
 * A guard that checks if the user is signed in.
 *
 * @return {boolean} Returns true if the user is signed in, false otherwise.
 */
export const isSignedInGuard: CanActivateFn = (): boolean => {
    const sessionStore: SessionStore = inject(SessionStore);
    const router: Router = inject(Router);
    let sessionAsSignal: Signal<Session | null> = sessionStore.selectSession();
    
    if (sessionAsSignal()?.user) {
        return true;
    } else {
        router.navigate(['/landing/sign-in']);
        return false;
    }
};
