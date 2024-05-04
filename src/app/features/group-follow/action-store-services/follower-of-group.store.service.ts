import {Injectable} from '@angular/core';
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowerOfGroupStoreService {
    public followersOfGroup: ArrayStoreService<FunctionSingleReturn<'read_follower_of_group'>>

    constructor() {
        this.followersOfGroup = new ArrayStoreService<FunctionSingleReturn<'read_follower_of_group'>>();
    }
}
