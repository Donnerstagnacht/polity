import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EntityStoreService<T> {
    private entity: WritableSignal<T | null> = signal(null);

    constructor() {
    }

    public selectEntity(): WritableSignal<T | null> {
        return this.entity;
    }

    public resetEntity(): void {
        this.entity.set(null);
    }

    public mutateEntity(entity: T): void {
        const mergeUpdatesWithStoreData: T = {
            ...this.entity(),
            ...entity
        };
        this.entity.set(mergeUpdatesWithStoreData);
    }
}
