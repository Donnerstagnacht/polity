import {Injectable, WritableSignal} from '@angular/core';
import {Profile} from "../types-and-interfaces/profile";
import {EntityStoreService} from "../../../core/services/entity-store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService {
    // private profile: WritableSignal<Profile | null> = signal(null);
    public profile: EntityStoreService<Profile>;

    constructor() {
        this.profile = new EntityStoreService<Profile>();
    }

    /**
     * Returns the global profile object that notifies consumers of changes
     *
     * @return {WritableSignal<Profile | null>}.
     */
    // public selectProfile(): WritableSignal<Profile | null> {
    //     return this.profile;
    // }

    /**
     * Sets the profile with the provided profile.
     *
     * @param {Profile | null} profile - The profile to update. If null, the profile will be cleared.
     * @return {void}
     */
    // public setProfile(profile: Profile | null): void {
    //     // TODO: Understanding why this works
    //     const mergeUpdatesWithStoreData: Profile = {
    //         ...this.profile(),
    //         ...profile
    //     } as Profile
    //     this.profile.set(mergeUpdatesWithStoreData);
    // }

    /**
     * Resets the profile state.
     *
     * @return {void}
     */
    // public resetProfile(): void {
    //     this.profile.set(null);
    // }


    /**
     * Mutates the profile by updating the profile image URL.
     *
     * @param {string} profileImageUrl - The new URL of the profile image.
     * @return {void}
     */
    // public mutateProfileImageURL(profileImageUrl: string): void {
    //     this.profile.mutate((profile: Profile | null): void => {
    //         if (profile) {
    //             profile.profile_image = profileImageUrl;
    //         }
    //     })
    // }
}
