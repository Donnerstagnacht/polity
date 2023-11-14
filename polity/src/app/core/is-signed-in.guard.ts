import {CanActivateFn, Router} from '@angular/router';
import {SessionStoreService} from "./services/session-store.service";
import {inject, WritableSignal} from "@angular/core";
import {Session} from "@supabase/supabase-js";

/**
 * A guard that checks if the user is signed in.
 *
 * @return {boolean} Returns true if the user is signed in, false otherwise.
 */
export const isSignedInGuard: CanActivateFn = (): boolean => {
    const sessionStoreService: SessionStoreService = inject(SessionStoreService);
    const router: Router = inject(Router);
    let sessionAsSignal: WritableSignal<Session | null> = sessionStoreService.selectSession();

    if (sessionAsSignal()?.user) {
        return true;
    } else {
        router.navigate(['/landing/sign-in'])
        return false
    }
};
