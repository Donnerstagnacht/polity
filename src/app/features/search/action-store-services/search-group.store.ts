import {signalStore, withComputed, withMethods} from "@ngrx/signals";
import {computed} from "@angular/core";
import {withRpcHandler} from "../../../store-ngrx/rpcHandler.feature";

// type SearchUserState = {
//     searchUserResults: DatabaseAuthenticatedOverwritten['authenticated']['Functions']['search_group']['Returns']
// }
//
// const initialState: SearchUserState = {
//     searchUserResults: []
// }

export const SearchGroupStore = signalStore(
    {providedIn: 'root'},
    // withState(initialState),

    withRpcHandler<'search_group'>(
        'search_group',
        []
    ),

    withMethods((store) => {
        return {
            async searchGroup(searchTerm: string) {
                const results = await store.rpcHandler(
                    'search_group',
                    {_search_term: searchTerm}
                )
            },
        }
    }),

    withComputed((store) => ({
            noData: computed((): boolean => {
                if (store.data().length > 0) {
                    return false
                } else {
                    return true
                }
            })
        }),
    )
)
