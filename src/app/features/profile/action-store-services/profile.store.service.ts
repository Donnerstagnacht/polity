import {Injectable, signal} from '@angular/core';
import {ObjectStoreService} from "../../../signal-store/object-store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

type ProfileUIFlags =
    'isOwner' |
    'isFollowing' |
    'isFollowingCheckLoading';


@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService {
    public profile: ObjectStoreService<SupabaseObjectReturn<'read_user'>, ProfileUIFlags>;
    public groupsOfUser: ArrayStoreService<SupabaseObjectReturn<'read_groups_of_user'>>;
    private uiFlags = {
        isOwner: signal(false),
        isFollowing: signal(false),
        isFollowingCheckLoading: signal(true)
    }

    constructor() {
        this.profile = new ObjectStoreService<SupabaseObjectReturn<'read_user'>, ProfileUIFlags>(this.uiFlags);
        this.groupsOfUser = new ArrayStoreService<SupabaseObjectReturn<'read_groups_of_user'>>();
    }
}
