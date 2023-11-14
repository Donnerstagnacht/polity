import {Injectable, signal, WritableSignal} from '@angular/core';
import {Profile} from "../../profile/types-and-interfaces/profile";

@Injectable({
    providedIn: 'root'
})
export class SearchStoreService {
    private profileSearchResults: WritableSignal<Profile[] | null> = signal(null);

    /**
     * Updates the search results with the given array of profiles.
     *
     * @param {searchResults: Profile[]}  - The array of profiles to update the search results with.
     * @return {void}
     */
    public updateProfileSearchResults(searchResults: Profile[] | null): void {
        this.profileSearchResults.set(searchResults);
    }

    /**
     * Returns the global user search object that notifies consumers of changes
     *
     * @returns {WritableSignal<Profile[] | null>} The selected writable signal.
     */
    public selectProfileSearchResults(): WritableSignal<Profile[] | null> {
        return this.profileSearchResults;
    }
}
