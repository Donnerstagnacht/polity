import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {SearchUtilitiesService} from "./search-utilities.service";
import {withRpcHandler} from "../../../store-ngrx/rpcHandler.feature";

export const SearchUserStore = signalStore(
    {providedIn: 'root'},
    withState({count: 0}),

    withRpcHandler<'search_user'>(
        'search_user',
        []
    ),

    // withDecrementFeature(),

    withMethods((
        store,
        searchUtilitiesService: SearchUtilitiesService = inject(SearchUtilitiesService)
    ) => {

        return {
            async searchUser(searchTerm: string): Promise<void> {
                searchTerm = searchUtilitiesService.replaceSpacesWithPipe(searchTerm);
                const results = await store.rpcHandler(
                    'search_user',
                    {_search_term: searchTerm}
                )
            }
        }
    }),

    withComputed((store) => ({
            noData: computed((): boolean => {
                console.log('computed', store.data().length)
                if (store.data().length > 0) {
                    return false
                } else {
                    return true
                }
            })
        }),
    )
)

function decrement(data: any[] | null, store: any) {
    if (data && data.length > 0) {
        patchState(store, {count: store.count() - 1});
    }

}
