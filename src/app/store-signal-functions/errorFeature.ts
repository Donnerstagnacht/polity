import {ErrorStoreService} from './error-store.service';
import {ErrorState} from './types/errorState.type';


/**
 * Updates the local error state with the provided error message and status.
 *
 * @param {string} errorMessage - The error message to be set.
 * @param {boolean} newStatus - The new status to be set.
 * @param {ErrorState} errorState - The error state object to be updated.
 * @return {void} This function does not return anything.
 */
export function updateErrorLocal(
    errorMessage: string,
    newStatus: boolean,
    errorState: ErrorState
): void {
    errorState.set({
        error: errorMessage,
        showError: newStatus
    });
}

/**
 * Updates the global error state with the provided error message and status.
 *
 * @param {string} errorMessage - The error message to be set.
 * @param {boolean} newStatus - The new status to be set.
 * @param {ErrorStoreService} errorState - The error state service to be updated.
 * @return {void} This function does not return anything.
 */
export function updateErrorGlobal(
    errorMessage: string,
    newStatus: boolean,
    errorState: ErrorStoreService
): void {
    errorState.updateError(
        errorMessage,
        newStatus
    );
}
