import {computed, Signal, WritableSignal} from '@angular/core';
import {LoadingState} from './types/loadingState.type';


/**
 * Updates the loading state to indicate that loading has started.
 *
 * @param {WritableSignal<LoadingState>} loadingState - The writable signal for the loading state.
 * @return {void} This function does not return a value.
 */
export function loadingStarted(loadingState: WritableSignal<LoadingState>): void {
    loadingState.set({
        ...loadingState(),
        loading: true,
        dataRequested: true
    });
}

/**
 * Updates the loading state to indicate that loading has stopped.
 *
 * @param {WritableSignal<LoadingState>} loadingState - The writable signal for the loading state.
 * @return {void} This function does not return a value.
 */
export function loadingStopped(loadingState: WritableSignal<LoadingState>): void {
    loadingState.set({...loadingState(), loading: false});
}

/**
 * Checks if the given data signal contains data.
 *
 * @param {WritableSignal<any>} data - The signal containing the data.
 * @return {Signal<boolean>} A signal indicating whether data exists or not.
 */
export function checkIfDataFound
(
    data: WritableSignal<any>
): Signal<boolean> {
    return computed((): boolean => {
        if (data().length > 0) {
            return false;
        } else {
            return true;
        }
    });
}
