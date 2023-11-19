import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {ErrorStoreService} from "../../../core/services/error-store.service";
import {SearchStoreService} from "./search-store.service";
import {supabaseClient} from "../../../core/services/supabase-client";
import {DatabaseModified} from "../../../../../supabase/types/supabase.modified";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private supabaseClient: SupabaseClient<DatabaseModified> = supabaseClient

    constructor(
        private readonly notificationService: ErrorStoreService,
        private readonly searchStoreService: SearchStoreService
    ) {
    }

    //TODO: Define data and error type returned by rpc function
    /**
     * Searches for usernames based on the provided search term.
     *
     * @param {string} searchTerm - The search term to use.
     * @return {Promise<boolean>} Returns true if the search was successful.
     */
    public async searchUser(searchTerm: string): Promise<boolean> {
        this.searchStoreService.profilSearchResults.resetEntities()
        // this.searchStoreService.updateProfileSearchResults(null);
        try {
            const response: PostgrestSingleResponse<any> = await this.supabaseClient.rpc(
                'search_user',
                {search_term: searchTerm}
            ).throwOnError()
            this.searchStoreService.profilSearchResults.mutateEntities(response.data)
            // this.searchStoreService.updateProfileSearchResults(response.data);
            return false;
        } catch (error: any) {
            this.notificationService.updateError(error.message, true);
            return false;
        }
    }
}
