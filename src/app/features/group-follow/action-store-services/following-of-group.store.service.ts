import {Injectable} from '@angular/core';
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingOfGroupStoreService {
    public followingOfGroup: ArrayStoreService<FunctionSingleReturn<'select_following_of_group'>>;

    constructor() {
        this.followingOfGroup = new ArrayStoreService<FunctionSingleReturn<'select_following_of_group'>>();
    }
}
