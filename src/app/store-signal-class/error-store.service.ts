import {Injectable, signal, WritableSignal} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ErrorStoreService {
    private error: WritableSignal<string> = signal('')
    private showError: WritableSignal<boolean> = signal(false);

    /**
     * Updates the global notification signal.
     *
     * @param {string} notification - The new notification message to be set.
     * @param {boolean} newStatus - The new status to be set. if set to true, message wil be shown in UI.
     * @return {void}
     */
    public updateError(notification: string, newStatus: boolean): void {
        this.error.set(notification);
        this.setErrorStatus(newStatus);
    }

    /**
     * Sets the error status.
     *
     * @param {boolean} newStatus - The new status to be set. if set to true, message wil be shown in UI.
     * @return {void}
     */
    public setErrorStatus(newStatus: boolean): void {
        this.showError.set(newStatus);
    }

    /**
     * Returns the global error as `WritableSignal` that notifies consumers if it changes
     *
     * @return {WritableSignal<string>}
     */
    public selectError(): WritableSignal<string> {
        return this.error;
    }

    /**
     * Returns the global status if an error should be shown as 'WritableSignal' that notifies consumers of
     * changes
     *
     * @return {WritableSignal<boolean>}
     */
    public selectShowError(): WritableSignal<boolean> {
        return this.showError;
    }
}
