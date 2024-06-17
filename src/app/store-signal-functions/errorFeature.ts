import {WritableSignal} from "@angular/core";
import {ErrorStoreService} from "../store-signal-class/error-store.service";

export type ErrorState = WritableSignal<{
    error: string
    showError: boolean
}>

export function updateErrorLocal(
    errorMessage: string,
    newStatus: boolean,
    errorState: ErrorState
): void {
    errorState.set({
        error: errorMessage,
        showError: newStatus
    })
}

export function updateErrorGlobal(
    errorMessage: string,
    newStatus: boolean,
    errorState: ErrorStoreService
): void {
    errorState.updateError(
        errorMessage,
        newStatus
    )
}
