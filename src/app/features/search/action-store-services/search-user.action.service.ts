import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {SearchStoreService} from "./search.store.service";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {FunctionTableReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {supabaseClient} from "../../../auth/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class SearchUserActionService {
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
            const response: PostgrestSingleResponse<FunctionTableReturn<'search_user'>> = await this.supabaseClient.rpc(
                'search_user',
                {search_term: searchTerm}
            ).throwOnError()
            if (response.data) {
                this.searchStoreService.profilSearchResults.setObjects(response.data)
            }
        })
    }
}
