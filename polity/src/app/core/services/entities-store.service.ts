import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EntitiesStoreService<T> {
    private entities: WritableSignal<T[]> = signal([]);

    constructor() {
    }

    selectEntities(): WritableSignal<T[]> {
        return this.entities;
    }

    resetEntities(): void {
        this.entities.set([]);
    }

    mutateEntities(entities: T[]): void {
        const mergeUpdatesWithStoreData: T[] = [
            ...this.entities(),
            ...entities
        ]
        this.entities.set(entities);
    }
}
