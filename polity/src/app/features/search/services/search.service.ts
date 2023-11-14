import {Injectable} from '@angular/core';
import {createClient, PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {environment} from "../../../../environments/environment";
import {NotificationsStoreService} from "../../../core/services/notifications-store.service";
import {SearchStoreService} from "./search-store.service";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private supabaseClient: SupabaseClient

    constructor(
        private readonly notificationService: NotificationsStoreService,
        private readonly searchStoreService: SearchStoreService
    ) {
        this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    //TODO: Define data and error type returned by rpc function
    /**
     * Searches for usernames based on the provided search term.
     *
     * @param {string} searchTerm - The search term to use.
     * @return {Promise<boolean>} Returns true if the search was successful.
     */
    public async searchUser(searchTerm: string): Promise<boolean> {
        this.searchStoreService.updateProfileSearchResults(null);
        try {
            const response: PostgrestSingleResponse<any> = await this.supabaseClient.rpc(
                'search_user',
                {search_term: searchTerm}
            ).throwOnError()
            this.searchStoreService.updateProfileSearchResults(response.data);
            return false;
        } catch (error: any) {
            this.notificationService.updateNotification(error.message, true);
            return false;
        }
    }
}
