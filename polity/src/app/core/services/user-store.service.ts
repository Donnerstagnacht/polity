import {Injectable} from '@angular/core';
import {createStore, select, withProps} from "@ngneat/elf";
import {UserProperties} from "../types-and-interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private userStore = createStore(
      {name: 'user'},
      withProps<UserProperties>({user: {id: 'hello2'}}),
  )

  public user$ = this.userStore.pipe(select((state: UserProperties) => {
    return state.user
  }))

  public updateUser(user: UserProperties['user']) {
    console.log('readched');
    this.userStore.update((state: UserProperties): {user: UserProperties['user']} => (
        {
          ...state,
          user: user,
        }));
  }
}
