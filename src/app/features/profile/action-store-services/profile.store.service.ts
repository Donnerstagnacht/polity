import {Injectable, signal} from '@angular/core';
import {ObjectStoreService} from "../../../signal-store/object-store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";

type ProfileUIFlags =
    'isOwner' |
    'isFollowing' |
    'isFollowingCheckLoading';


@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService {
    public profile: ObjectStoreService<SupabaseObjectReturn<'read_user'>, ProfileUIFlags>;
    private uiFlags = {
        isOwner: signal(false),
        isFollowing: signal(false),
        isFollowingCheckLoading: signal(true)
    }

    constructor() {
        this.profile = new ObjectStoreService<SupabaseObjectReturn<'read_user'>, ProfileUIFlags>(this.uiFlags);
    }
}
