import {Injectable} from '@angular/core';
import {SupabaseArrayReturnConditional} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowerOfGroupStoreService {
    public followersOfGroup: ArrayStoreService<SupabaseArrayReturnConditional<'read_follower_of_group'>>

    constructor() {
        this.followersOfGroup = new ArrayStoreService<SupabaseArrayReturnConditional<'read_follower_of_group'>>();
    }
}
