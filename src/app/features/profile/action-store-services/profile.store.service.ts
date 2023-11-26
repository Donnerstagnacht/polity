import {Injectable, signal, WritableSignal} from '@angular/core';
import {Profile} from "../../../../../cypress/fixtures/profile";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

export type profileUiFlags = {
    isOwner: WritableSignal<boolean>,
    isFollowing: WritableSignal<boolean>,
    isFollowingCheckLoading: WritableSignal<boolean>
}

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService {
    public profile: ObjectStoreService<Profile>;
    private uiFlags: profileUiFlags = {
        isOwner: signal(false),
        isFollowing: signal(false),
        isFollowingCheckLoading: signal(true)
    }

    constructor() {
        this.profile = new ObjectStoreService<Profile>(this.uiFlags);
    }
}
