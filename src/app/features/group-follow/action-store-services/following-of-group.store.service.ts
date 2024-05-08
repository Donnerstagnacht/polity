import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingOfGroupStoreService {
    public followingOfGroup: ArrayStoreService<SupabaseObjectReturn<'read_following_of_group'>>;

    constructor() {
        this.followingOfGroup = new ArrayStoreService<SupabaseObjectReturn<'read_following_of_group'>>();
    }
}
