import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowersOfUserStoreService {
    public followersOfUser: ArrayStoreService<SupabaseObjectReturn<'select_follower_of_user'>>;

    constructor() {
        this.followersOfUser = new ArrayStoreService<SupabaseObjectReturn<"select_follower_of_user">>();
    }
}
