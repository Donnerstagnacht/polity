import {Injectable, signal, WritableSignal} from '@angular/core';
import {Profile} from "../../profile/types-and-interfaces/profile";
import {EntitiesStoreService} from "../../../core/services/entities-store.service";
import {LoadingStoreService} from "../../../core/services/loading-store.service";

@Injectable({
    providedIn: 'root'
})
export class SearchStoreService {
    public profilSearchResults: EntitiesStoreService<Profile>;
    public loading: LoadingStoreService;
    private profileSearchResults: WritableSignal<Profile[] | null> = signal(null);

    constructor() {
        this.profilSearchResults = new EntitiesStoreService<Profile>();
        this.loading = new LoadingStoreService();
    }

    /**
     * Updates the search results with the given array of profiles.
     *
     * @param {searchResults: Profile[] | null}  - The array of profiles to update the search results with.
     * @return {void}
     */
    // public updateProfileSearchResults(searchResults: Profile[] | null): void {
    //     this.profileSearchResults.set(searchResults);
    // }

    /**
     * Returns the global user search object that notifies consumers of changes
     *
     * @returns {WritableSignal<Profile[] | null>} The selected writable signal.
     */
    // public selectProfileSearchResults(): WritableSignal<Profile[] | null> {
    //     return this.profileSearchResults;
    // }
}
