import {patchState, signalStoreFeature, withMethods, withState} from "@ngrx/signals";

type ErrorState = {
    error: string,
    showError: boolean
}

const initialErrorState: ErrorState = {
    error: '',
    showError: false
}

export function withError() {
    return signalStoreFeature(
        withState(initialErrorState),

        withMethods((store) => {
            return {
                updateError(
                    errorMessage: string,
                    newStatus: boolean
                ): void {
                    patchState(store, {
                        error: errorMessage,
                        showError: newStatus
                    });
                },

                updateShowError(newStatus: boolean): void {
                    patchState(store, {
                        showError: newStatus
                    });
                }
            }
        })
    )
}
