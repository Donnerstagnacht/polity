import {CanActivateFn, Router} from '@angular/router';
import {SessionStoreService} from "./services/session-store.service";
import {inject} from "@angular/core";
import { map} from "rxjs";

export const isSignedInGuard: CanActivateFn = () => {
    const sessionStoreService = inject(SessionStoreService);
    const router = inject(Router);
    let sessionAsObservable = sessionStoreService.selectSessionSlice();

    sessionAsObservable.subscribe((session) => {
            if (session?.user) {
                console.log('sign in')
                console.log(session)
            } else {
                console.log('sign out')
                console.log(session)
                router.navigate(['/login']);
            }
        }

    )
    return sessionAsObservable.pipe(
        // filter((session: AuthSession | null) => session !== undefined),
        map((session) => {
            if(session?.user) {
                console.log('Guard: sign in')
                console.log(session)
                return true;
            } else {
                console.log('Guard: sign out')
                console.log(session)

                router.navigate(['/login']);
                return false;
            }
        })
    )

// if(sessionAsSignal()?.user) {
//     console.log('sign in')
//     return true;
// } else {
//     console.log('sign out')
//     router.navigate(['/login'])
//     return true;
// }
};
