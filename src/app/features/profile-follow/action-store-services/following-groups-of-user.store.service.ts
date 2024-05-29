import {Injectable} from '@angular/core';
import {ArrayStoreService} from "../../../signal-store/array-store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class FollowingGroupsOfUserStoreService {
    public followingGroupsOfUser: ArrayStoreService<SupabaseObjectReturn<"read_group_followings_of_user">>;

    constructor() {
        this.followingGroupsOfUser = new ArrayStoreService<SupabaseObjectReturn<"read_group_followings_of_user">>();
    }
}
