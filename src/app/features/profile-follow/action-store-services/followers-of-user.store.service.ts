import {Injectable} from '@angular/core';
import {PlainFunctions} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class FollowersOfUserStoreService {
    public followersOfUser: ArrayStoreService<PlainFunctions<'select_follower_of_user'>>;

    constructor() {
        this.followersOfUser = new ArrayStoreService<PlainFunctions<"select_follower_of_user">>();
    }
}
