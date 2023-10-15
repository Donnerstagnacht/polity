import { Injectable } from '@angular/core';
import {AuthSession} from "@supabase/supabase-js";
import {createStore, select, withProps} from "@ngneat/elf";

type  SessionProperties = {
  session: AuthSession | null;
}

export const sessionStore = createStore(
    {name: 'session'},
    withProps<SessionProperties>({session: null}),
)

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {


  selectSession() {
    return sessionStore.asObservable()
  }

  session$ = sessionStore.pipe(select((state: SessionProperties) => {
    return state.session
  }))

  selectSessionSlice() {
    return this.session$;
  }



  constructor() { }

  updateSession(session: AuthSession | null) {
    console.log('readched sessionstore');
    sessionStore.update(
        (state: SessionProperties) => (
            {
              ...state,
              session: session,
            }
        )
    )
  }

  clearStore(): void {
    sessionStore.reset()
  }
}
