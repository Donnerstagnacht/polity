import { Injectable} from '@angular/core';
import {AuthSession} from "@supabase/supabase-js";
import {createStore, select, withProps} from "@ngneat/elf";
import {Observable} from "rxjs";
import {localStorageStrategy, persistState} from "@ngneat/elf-persist-state";

export type  SessionProperties = {
  session: AuthSession | null;
}

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {
  private sessionStore = createStore(
      {name: 'session'},
      withProps<SessionProperties>({session: null}),
  )

  private persist = persistState(this.sessionStore, {
    key: 'session',
    storage: localStorageStrategy,
  });

  private session$ = this.sessionStore.pipe(select((state: SessionProperties) => {
    return state.session
  }))

  public selectSessionSlice(): Observable<AuthSession | null> {
    return this.session$;
  }

  public updateSession(session: AuthSession | null) {
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
