import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {SessionStoreService} from "../../core/services/session-store.service";
import {inject, WritableSignal} from "@angular/core";
import {Session} from "@supabase/supabase-js";

/**
 * A guard that checks if the user is signed in.
 *
 * @return {boolean} Returns true if the user is signed in, false otherwise.
 */
export const isOwnerGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const sessionStoreService: SessionStoreService = inject(SessionStoreService);
    const router: Router = inject(Router);
    let sessionAsSignal: WritableSignal<Session | null> = sessionStoreService.selectSession();
    // get dynamic route params
    const id = route.paramMap.get('id') as string;
    console.log('id: ', id);
    console.log('profile: ', sessionAsSignal()?.user.id);

    if (sessionAsSignal()?.user.id === id) {
        return true;
    } else {
        console.log('not owner')
        router.navigate(['/profile/' + id])
        return false
    }
};
