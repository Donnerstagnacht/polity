import {Injectable} from '@angular/core';
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {SearchUserStoreService} from "./search-user.store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {SearchUtilitiesService} from "./search-utilities.service";

@Injectable({
    providedIn: 'root'
})
export class SearchUserActionService {
    private supabaseClient = supabaseAuthenticatedClient;

    constructor(
        private readonly searchStoreService: SearchUserStoreService,
        private readonly searchUtilitiesService: SearchUtilitiesService
    ) {
    }

    /**
     * Searches for usernames based on the provided search term.
     *
     * @param {string} searchTerm - The search term to use.
     * @return {Promise<boolean>} Returns true if the search was successful.
     */
    public async searchUser(searchTerm: string): Promise<void> {
        searchTerm = this.searchUtilitiesService.replaceSpacesWithPipe(searchTerm);
        this.searchStoreService.profilSearchResults.resetObjects()
        const response: PostgrestSingleResponse<SupabaseObjectReturn<'search_user'>[]> =
            await this.searchStoreService.profilSearchResults.manageSelectApiCall(async () => {
                return this.supabaseClient.rpc(
                    'search_user',
                    {_search_term: searchTerm}
                )
            })
        if (response.data) {
            this.searchStoreService.profilSearchResults.setObjects(response.data)
        }
    }

}
