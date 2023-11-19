import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingStoreService {
    private loading: WritableSignal<boolean> = signal(false);

    constructor() {
    }

    public selectLoading(): WritableSignal<boolean> {
        return this.loading;
    }

    public startLoading(): void {
        this.loading.set(true);
    }

    public stopLoading(): void {
        this.loading.set(false);
    }
}
