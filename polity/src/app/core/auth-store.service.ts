import { Injectable } from '@angular/core';
import {createStore, select, withProps} from "@ngneat/elf";

interface AuthProperties {
  user: {id: string} | null;
}
@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  authStore = createStore(
      {name: 'auth'},
      withProps<AuthProperties>({user: {id: 'hello2'}}),
  )

  user$ = this.authStore.pipe(select((state: AuthProperties) => {
    return state.user
  }))

  updateUser(user: AuthProperties['user']) {
    console.log('readched');
    this.authStore.update((state: AuthProperties): {user: AuthProperties['user']} => (
        {
          ...state,
          user: user,
        }));
  }
}
