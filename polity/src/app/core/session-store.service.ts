import { Injectable } from '@angular/core';
import {AuthSession} from "@supabase/supabase-js";
import {createStore, withProps} from "@ngneat/elf";

interface  SessionProperties {
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
}
