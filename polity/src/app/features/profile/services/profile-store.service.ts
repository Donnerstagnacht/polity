import {Injectable, signal, WritableSignal} from '@angular/core';
import {Profile} from "../types-and-interfaces/profile";
import {ObjectStoreService} from "../../../shared/signal-store/object-store.service";

export type profileUiFlags = {
    isOwner: WritableSignal<boolean>,
    isFollowing: WritableSignal<boolean>,
    isFollowingCheckLoading: WritableSignal<boolean>
}

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService {
    public profile: ObjectStoreService<Profile, profileUiFlags>;
    private uiFlags: profileUiFlags = {
        isOwner: signal(false),
        isFollowing: signal(false),
        isFollowingCheckLoading: signal(true)
    }

    constructor() {
        this.profile = new ObjectStoreService<Profile, profileUiFlags>();
        this.profile.uiFlagStore.setUiFlags(this.uiFlags)
    }
}
