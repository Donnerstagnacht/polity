import {Injectable} from '@angular/core';
import {SupabaseArrayReturnConditional} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingOfGroupStoreService {
    public followingOfGroup: ArrayStoreService<SupabaseArrayReturnConditional<'read_following_of_group'>>;

    constructor() {
        this.followingOfGroup = new ArrayStoreService<SupabaseArrayReturnConditional<'read_following_of_group'>>();
    }
}
