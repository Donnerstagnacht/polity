import { Injectable} from '@angular/core';
import {AuthSession} from "@supabase/supabase-js";
import {createStore, select, withProps} from "@ngneat/elf";
import {Observable} from "rxjs";
import {localStorageStrategy, persistState} from "@ngneat/elf-persist-state";

export type  SessionProperties = {
  session: AuthSession | null;
}

// export const sessionStore = createStore(
//     {name: 'session'},
//     withProps<SessionProperties>({session: null}),
// )
//
// export const persist = persistState(sessionStore, {
//   key: 'session',
//   storage: localStorageStrategy,
// });

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {
  sessionStore = createStore(
      {name: 'session'},
      withProps<SessionProperties>({session: null}),
  )

  persist = persistState(this.sessionStore, {
    key: 'session',
    storage: localStorageStrategy,
  });

  session$ = this.sessionStore.pipe(select((state: SessionProperties) => {
    return state.session
  }))

  selectSessionSlice(): Observable<AuthSession | null> {
    return this.session$;
  }

  updateSession(session: AuthSession | null) {
    console.log('readched sessionstore');
    this.sessionStore.update(
        (state: SessionProperties) => (
            {
              ...state,
              session: session,
            }
        )
    )
  }
}
