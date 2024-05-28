import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingOfUserStoreService {
    public followingOfUser: ArrayStoreService<SupabaseObjectReturn<'read_followings_of_user'>>;

    constructor() {
        this.followingOfUser = new ArrayStoreService<SupabaseObjectReturn<'read_followings_of_user'>>();
    }
}
