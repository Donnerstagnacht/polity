import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SearchUserActionService {
    // private supabaseClient = supabaseAuthenticatedClient;
    //
    // constructor(
    //     private readonly searchStoreService: SearchUserStoreService,
    //     private readonly searchUtilitiesService: SearchUtilitiesService,
    //     private readonly abstractRpcService: AbstractRpcService
    // ) {
    // }
    //
    // /**
    //  * Searches for usernames based on the provided search term.
    //  *
    //  * @param {string} searchTerm - The search term to use.
    //  * @return {Promise<boolean>} Returns true if the search was successful.
    //  */
    // public async searchUser(searchTerm: string): Promise<void> {
    //     searchTerm = this.searchUtilitiesService.replaceSpacesWithPipe(searchTerm);
    //     this.searchStoreService.profilSearchResults.resetObjects()
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'search_user'>[]> =
    //         await this.searchStoreService.profilSearchResults.manageSelectApiCall(async () => {
    //                 const test1: PostgrestSingleResponse<SupabaseObjectReturn<'search_user'>[]> = await this.supabaseClient.rpc(
    //                     'search_user',
    //                     {_search_term: searchTerm}
    //                 )
    //
    //                 const test4 = await this.abstractRpcService.abstractRpc6(
    //                     'search_user',
    //                     {_search_term: searchTerm}
    //                 )
    //                 return test4
    //             },
    //             false)
    //     if (response.data) {
    //         this.searchStoreService.profilSearchResults.setObjects(response.data)
    //     }
    //     if (response.error?.code === 'P0002') {
    //         this.searchStoreService.profilSearchResults.setObjects([])
    //     }
    // }

}
