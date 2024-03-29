import {Injectable, signal, WritableSignal} from '@angular/core';
import {ObjectStoreService} from "../../../signal-store/object-store.service";
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";

export type profileUiFlags = {
    isOwner: WritableSignal<boolean>,
    isFollowing: WritableSignal<boolean>,
    isFollowingCheckLoading: WritableSignal<boolean>
}

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService {
    public profile: ObjectStoreService<FunctionSingleReturn<'select_user'>>;
    private uiFlags: profileUiFlags = {
        isOwner: signal(false),
        isFollowing: signal(false),
        isFollowingCheckLoading: signal(true)
    }

    constructor() {
        this.profile = new ObjectStoreService<FunctionSingleReturn<'select_user'>>(this.uiFlags);
    }
}
