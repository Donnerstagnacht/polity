import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ArrayStoreService} from "../../../store-signal-class/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowerOfGroupStoreService {
    public followersOfGroup: ArrayStoreService<SupabaseObjectReturn<'read_followers_of_group'>>

    constructor() {
        this.followersOfGroup = new ArrayStoreService<SupabaseObjectReturn<'read_followers_of_group'>>();
    }
}
