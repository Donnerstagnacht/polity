import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingStoreService {
    private loading: WritableSignal<boolean> = signal(true);

    /**
     * Returns the loading signal of store.
     *
     * @return {WritableSignal<boolean>} The loading value as signal which notifies consumers of loading status changes.
     */
    public getLoading(): WritableSignal<boolean> {
        return this.loading;
    }

    /**
     * Starts the loading process, e.g. indicates that the store value is currently being loaded.
     *
     * @return {void}
     */
    public startLoading(): void {
        this.loading.set(true);
    }

    /**
     * Stops the loading process, e.g. indicates that the data is loaded to the store.
     *
     * @return {void}
     */
    public stopLoading(): void {
        this.loading.set(false);
    }
}
