import {patchState, signalStoreFeature, withMethods} from "@ngrx/signals";

type ErrorState = {
    error: string,
    showError: boolean
}

const initialErrorState: ErrorState = {
    error: '',
    showError: false
}

const initialState = {
    counterA: 0,
    counterB: 0
}

// export function withCounterStore() {
//
//     return signalStoreFeature(
//         withState({count: 0}),
//
//         withDecrementFeature()
//     )
// }


export function withDecrementFeature(parentState: any) {

    return signalStoreFeature(
        withMethods(() => {
            // const parentState = inject(SearchUserStore);

            return {
                decrement() {
                    const currentCount = parentState.count();
                    // patchState(store, {count: currentCount - 1});
                    patchState(parentState, {count: currentCount - 1});
                },

                // decrementB(state: WritableSignal<Object>, key: keyof Object) {
                //     const currentCount = state[key]();
                //     // patchState(store, {count: currentCount - 1});
                //     patchState(parentState, {counterB: currentCount - 1});
                // }
            };
        })
    )
}
