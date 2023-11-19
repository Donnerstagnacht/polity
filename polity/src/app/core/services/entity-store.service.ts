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

    public incrementKey(key: keyof T | string): void {
        if (this.entity()) {
            this.incrementKeyRecursive(this.entity(), key);
        }
    }

    public decrementKey(key: keyof T | string): void {
        console.log('key', key);
        if (this.entity()) {
            this.decrementKeyRecursive(this.entity(), key);
        }
    }

    private incrementKeyRecursive(obj: any, key: keyof T | string): void {
        console.log('increment1');
        if (obj && typeof obj === 'object') {
            for (const prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (prop === key && typeof obj[prop] === 'number') {
                        obj[prop]++;
                    } else if (typeof obj[prop] === 'object') {
                        this.incrementKeyRecursive(obj[prop], key);
                    }
                }
            }
        }
    }

    private decrementKeyRecursive(obj: any, key: keyof T | string): void {
        console.log('decrement1');
        if (obj && typeof obj === 'object') {
            for (const prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (prop === key && typeof obj[prop] === 'number') {
                        obj[prop]--;
                    } else if (typeof obj[prop] === 'object') {
                        this.decrementKeyRecursive(obj[prop], key);
                    }
                }
            }
        }
    }

}
