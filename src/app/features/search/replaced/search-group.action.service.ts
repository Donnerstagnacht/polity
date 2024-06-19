import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SearchGroupActionService {
    // private supabaseClient = supabaseAuthenticatedClient
    //
    // constructor(
    //     private readonly searchStoreService: SearchGroupStoreService,
    //     private readonly searchUtilitiesService: SearchUtilitiesService
    // ) {
    // }
    //
    // /**
    //  * Searches for groupnames based on the provided search term.
    //  *
    //  * @param {string} searchTerm - The search term to use.
    //  * @return {Promise<boolean>} Returns true if the search was successful.
    //  */
    // public async searchGroup(searchTerm: string): Promise<void> {
    //     searchTerm = this.searchUtilitiesService.replaceSpacesWithPipe(searchTerm);
    //     this.searchStoreService.groupSearchResults.resetObjects()
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'search_group'>[]> =
    //         await this.searchStoreService.groupSearchResults.manageSelectApiCall(async () => {
    //                 return this.supabaseClient.rpc(
    //                     'search_group',
    //                     {_search_term: searchTerm}
    //                 )
    //             },
    //             false)
    //     if (response.data) {
    //         this.searchStoreService.groupSearchResults.setObjects(response.data)
    //     }
    //     console.log(response.error?.code)
    //     if (response.error?.code === 'P0002') {
    //         this.searchStoreService.groupSearchResults.setObjects([])
    //     }
    // }
}
