import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Signal} from '@angular/core';
import {Session} from '@supabase/supabase-js';
import {SessionStore} from '../../auth/store/session.store';

/**
 * A guard that checks if the user is signed in.
 *
 * @return {boolean} Returns true if the user is signed in, false otherwise.
 */
export const isOwnerGuard: CanActivateFn = (
    routeSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean => {
    const sessionStore: SessionStore = inject(SessionStore);
    const router: Router = inject(Router);
    let sessionAsSignal: Signal<Session | null> = sessionStore.selectSession();
    const loggedInUserId: string | undefined = sessionAsSignal()?.user.id;
    // const id: string = routeSnapshot.paramMap.get('id') as string; // OLD solution, does not work without
    // ngModule routing

    if (loggedInUserId && state.url.includes(loggedInUserId)) {
        return true;
    } else {
        router.navigate(['/home']);
        return false;
    }
};
