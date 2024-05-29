import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowerOfGroupStoreService {
    public followersOfGroup: ArrayStoreService<SupabaseObjectReturn<'read_followers_of_group'>>

    constructor() {
        this.followersOfGroup = new ArrayStoreService<SupabaseObjectReturn<'read_followers_of_group'>>();
    }
}
