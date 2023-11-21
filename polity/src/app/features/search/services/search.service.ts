import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {SearchStoreService} from "./search-store.service";
import {DatabaseModified} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../shared/services/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private supabaseClient: SupabaseClient<DatabaseModified> = supabaseClient

    constructor(
        private readonly searchStoreService: SearchStoreService
    ) {
    }

    /**
     * Searches for usernames based on the provided search term.
     *
     * @param {string} searchTerm - The search term to use.
     * @return {Promise<boolean>} Returns true if the search was successful.
     */
    public async searchUser(searchTerm: string): Promise<void> {
        this.searchStoreService.profilSearchResults.resetEntities()
        await this.searchStoreService.profilSearchResults.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<any> = await this.supabaseClient.rpc(
                'search_user',
                {search_term: searchTerm}
            ).throwOnError()
            this.searchStoreService.profilSearchResults.mutateEntities(response.data)
        })
    }
}
