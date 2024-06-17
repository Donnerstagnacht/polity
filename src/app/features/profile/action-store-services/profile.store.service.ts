import {Injectable, signal} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ObjectStoreService} from "../../../store-signal-class/object-store.service";

type ProfileUIFlags =
    'isOwner' |
    'isFollowing' |
    'isFollowingCheckLoading';

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService {
    public profile: ObjectStoreService<SupabaseObjectReturn<'read_profile'>, ProfileUIFlags>;
    private uiFlags = {
        isOwner: signal(false),
        isFollowing: signal(false),
        isFollowingCheckLoading: signal(true)
    }

    constructor() {
        this.profile = new ObjectStoreService<SupabaseObjectReturn<'read_profile'>, ProfileUIFlags>(this.uiFlags);
    }
}
