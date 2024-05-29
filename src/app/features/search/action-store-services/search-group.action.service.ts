import {Injectable} from '@angular/core';
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {SearchGroupStoreService} from "./search-group.store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {SearchUtilitiesService} from "./search-utilities.service";

@Injectable({
    providedIn: 'root'
})
export class SearchGroupActionService {
    private supabaseClient = supabaseAuthenticatedClient

    constructor(
        private readonly searchStoreService: SearchGroupStoreService,
        private readonly searchUtilitiesService: SearchUtilitiesService
    ) {
    }

    /**
     * Searches for groupnames based on the provided search term.
     *
     * @param {string} searchTerm - The search term to use.
     * @return {Promise<boolean>} Returns true if the search was successful.
     */
    public async searchGroup(searchTerm: string): Promise<void> {
        searchTerm = this.searchUtilitiesService.replaceSpacesWithPipe(searchTerm);
        this.searchStoreService.groupSearchResults.resetObjects()
        await this.searchStoreService.groupSearchResults.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'search_group'>[]> = await this.supabaseClient.rpc(
                'search_group',
                {_search_term: searchTerm}
            ).throwOnError()
            if (response.data) {
                this.searchStoreService.groupSearchResults.setObjects(response.data)
            }
        })
    }
}
