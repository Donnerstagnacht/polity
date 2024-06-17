import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ArrayStoreService} from "../../../store-signal-class/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowingGroupsOfUserStoreService {
    public followingGroupsOfUser: ArrayStoreService<SupabaseObjectReturn<"read_group_followings_of_user">>;

    constructor() {
        this.followingGroupsOfUser = new ArrayStoreService<SupabaseObjectReturn<"read_group_followings_of_user">>();
    }
}
