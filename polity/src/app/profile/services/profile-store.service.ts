import {Injectable} from '@angular/core';
import {createStore, select, Store, withProps} from "@ngneat/elf";
import {Profile, ProfileProperties} from "../types-and-interfaces/profile";
import {localStorageStrategy, persistState} from "@ngneat/elf-persist-state";

@Injectable({
  providedIn: 'root'
})
export class profileStoreService {
  private profileStore = createStore(
      {name: 'profile'},
      withProps<ProfileProperties>({profile: null}),
  )

  private persist = persistState(this.profileStore, {
    key: 'profile',
    storage: localStorageStrategy,

  });

    constructor() {
        window.addEventListener('storage', (event) => {
          if(event.key === 'profile') {
            if (event.newValue) {
              const profile = JSON.parse(event.newValue)
              this.updateProfile(profile.profile)
            }
          }
        })
    }

    public profile$ = this.profileStore.pipe(select((state: ProfileProperties) => {
    return state.profile
  }))

  public updateProfile(profile : Profile | null) {
    console.log('readched update store', profile);
    this.profileStore.update((state: ProfileProperties) => (
        {
          ...state,
            profile: profile
        }));
    this.profile$.subscribe((profile) => {
      console.log('after update', profile)
    })
  }
}
