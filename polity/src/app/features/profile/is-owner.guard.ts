import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {SessionStoreService} from "../../core/services/session-store.service";
import {inject, WritableSignal} from "@angular/core";
import {Session} from "@supabase/supabase-js";

/**
 * A guard that checks if the user is signed in.
 *
 * @return {boolean} Returns true if the user is signed in, false otherwise.
 */
export const isOwnerGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot
): boolean => {
    const sessionStoreService: SessionStoreService = inject(SessionStoreService);
    const router: Router = inject(Router);
    let sessionAsSignal: WritableSignal<Session | null> = sessionStoreService.selectSession();
    const id: string = route.paramMap.get('id') as string;

    if (sessionAsSignal()?.user.id === id) {
        return true;
    } else {
        router.navigate(['/profile/' + id])
        return false
    }
};
