import {patchState, signalStoreFeature, withMethods, withState} from "@ngrx/signals";

// export function withLoading(store2: {response: Signal<any[]>}) {
export function withLoading() {
    return signalStoreFeature(
        withState({
            loading: false,
            dataRequested: false
        }),


        // withComputed((store) => ({
        //         noData: computed((): boolean => {
        //             if (store2.response().length > 0) {
        //                 console.log('no data, message from computed')
        //                 return false
        //             } else {
        //                 console.log('data, message from computed')
        //                 return true
        //             }
        //             return true
        //         })
        //     }),
        // ),

        withMethods((store) => {
            return {
                startLoading() {
                    patchState(store, {loading: true});
                },
                stopLoading() {
                    patchState(store, {loading: false});
                },
                requestData() {
                    patchState(store, {dataRequested: true});
                }
            }
        })
    )

}
