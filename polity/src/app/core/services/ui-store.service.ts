import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UiStoreService {
    private isLoading: WritableSignal<boolean> = signal(false);
    private isOwner: WritableSignal<boolean> = signal(false);

    constructor() {
    }

    public setLoading(loading: boolean): void {
        this.isLoading.set(loading);
    }

    public selectLoading(): WritableSignal<boolean> {
        return this.isLoading;
    }

    public setIsOwner(loading: boolean): void {
        this.isOwner.set(loading);
    }

    public selectIsOwner(): WritableSignal<boolean> {
        return this.isOwner;
    }
}
