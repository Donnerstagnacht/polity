import {Injectable} from '@angular/core';
import {PlainFunctions} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../shared/signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingOfUserStoreService {
    public followingOfUser: ArrayStoreService<PlainFunctions<'select_following_of_user'>, {}>

    constructor() {
        this.followingOfUser = new ArrayStoreService<PlainFunctions<'select_following_of_user'>, {}>();
    }
}
