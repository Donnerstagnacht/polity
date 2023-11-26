import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {SessionStoreService} from "../../auth/services/session-store.service";
import {inject, WritableSignal} from "@angular/core";
import {Session} from "@supabase/supabase-js";

/**
 * A guard that checks if the user is signed in.
 *
 * @return {boolean} Returns true if the user is signed in, false otherwise.
 */
export const isOwnerGuard: CanActivateFn = (
    routeSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean => {
    const sessionStoreService: SessionStoreService = inject(SessionStoreService);
    const router: Router = inject(Router);
    let sessionAsSignal: WritableSignal<Session | null> = sessionStoreService.selectSession();
    const loggedInUserId: string | undefined = sessionAsSignal()?.user.id;
    // const id: string = routeSnapshot.paramMap.get('id') as string; // OLD solution, does not work without
    // ngModule routing

    if (loggedInUserId && state.url.includes(loggedInUserId)) {
        return true;
    } else {
        router.navigate(['/home']);
        return false
    }
};
