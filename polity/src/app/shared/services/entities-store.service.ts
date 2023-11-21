import {Injectable, signal, WritableSignal} from '@angular/core';
import {LoadingStoreService} from "./loading-store.service";

@Injectable({
    providedIn: 'root'
})
export class EntitiesStoreService<T extends T[]> {
    public loading: LoadingStoreService;
    private entities: WritableSignal<T[]> = signal([]);

    constructor() {
        this.loading = new LoadingStoreService();
    }

    getEntities(): WritableSignal<T> {
        return this.entities as WritableSignal<T>;
    }

    resetEntities(): void {
        this.entities.set([]);
    }

    mutateEntities(entities: T): void {
        const mergeUpdatesWithStoreData: T[] = [
            ...this.entities(),
            ...entities
        ]
        this.entities.set(entities);
    }
}
