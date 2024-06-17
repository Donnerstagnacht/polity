import {DatabaseAuthenticatedOverwritten} from "../../../../../supabase/types/supabase.authenticated.modified";
import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {withRpcHandler} from "./StoreFeatures/rpcHandler.feature";

type SearchUserState = {
    searchUserResults: DatabaseAuthenticatedOverwritten['authenticated']['Functions']['search_user']['Returns']
}

const initialState: SearchUserState = {
    searchUserResults: []
}

export const SearchUserStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),

    withRpcHandler<'search_user'>(
        'search_user',
        // [{
        //     id_: 'ssdfd',
        //     first_name_: 'Testname',
        //     last_name_: 'Testname',
        //     username_: 'Testname'
        // }]
        []
    ),

    withMethods((store) => {

        return {
            async searchUser(searchTerm: string) {
                const results = await store.rpcHandler(
                    'search_user',
                    {_search_term: searchTerm}
                )
                // if (results.data) {
                //     patchState(store, {searchUserResults: results.data})
                // }
            },

            async searchUser2(searchTerm: string) {
                const results = await store.rpc(
                    'search_user',
                    {_search_term: searchTerm}
                )
                if (results.data) {
                    patchState(store, {searchUserResults: results.data})
                }
            }
        }

    })
)
