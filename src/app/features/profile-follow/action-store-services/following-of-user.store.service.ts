import {Injectable} from '@angular/core';
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingOfUserStoreService {
    public followingOfUser: ArrayStoreService<FunctionSingleReturn<'select_following_of_user'>>;

    constructor() {
        this.followingOfUser = new ArrayStoreService<FunctionSingleReturn<'select_following_of_user'>>();
    }
}
