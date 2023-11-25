import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {SearchStoreService} from "./search-store.service";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../shared/services/supabase-client";
import {Functions} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient

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
        this.searchStoreService.profilSearchResults.resetObjects()
        await this.searchStoreService.profilSearchResults.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<Functions<'search_user'>> = await this.supabaseClient.rpc(
                'search_user',
                {search_term: searchTerm}
            ).throwOnError()
            if (response.data) {
                this.searchStoreService.profilSearchResults.setObjects(response.data)
            }
        })
    }
}
