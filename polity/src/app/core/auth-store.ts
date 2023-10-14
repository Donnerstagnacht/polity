import {createStore, select, withProps} from "@ngneat/elf";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

interface AuthProperties {
    user: {id: string} | null;
}

export const authStore = createStore(
    {name: 'auth'},
    withProps<AuthProperties>({user: {id: 'hello2'}}),
)

@Injectable({providedIn: 'root'})
export class AuthRepository {
    user$ = authStore.pipe(select((state: AuthProperties) => {
        state.user
    }))

    updateUser(user: AuthProperties['user']) {
        console.log('readched');
        authStore.update((state: AuthProperties): {user: AuthProperties['user']} => (
            {
            ...state,
            user: user,
        }));
    }
}


