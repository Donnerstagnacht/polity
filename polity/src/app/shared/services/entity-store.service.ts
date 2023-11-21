import {Injectable, signal, WritableSignal} from '@angular/core';
import {LoadingStoreService} from "./loading-store.service";


// ATTENTION: Type support only for non nested objects
// could not figure out how solve the type support for returned nested supabase types e.g. see GeneratedDatabase or
// how to hide array methods
type pathsToValues<T> = T extends Record<string, unknown>
    ? {
        [K in keyof T & string]: K | `${K}.${pathsToValues<T[K]>}`;
    }[keyof T & string]
    : never;

@Injectable({
    providedIn: 'root'
})
export class EntityStoreService<T> {
    public loading: LoadingStoreService;
    private entity: WritableSignal<T | null> = signal(null);

    constructor() {
        this.loading = new LoadingStoreService();
    }

    public getEntity(): WritableSignal<T | null> {
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
        if (this.entity()) {
            this.decrementKeyRecursive(this.entity(), key);
        }
    }

//       public getValueByKey(key: keyof T | string): any {
    public getValueByKey(key: keyof T | pathsToValues<T>): any {
        const keyAsString = key.toString()
        return this.getValueRecursive(this.entity(), keyAsString.split('.'));
    }

    private getValueRecursive(obj: T | any, keys: string[]): any {
        const currentKey = keys.shift();

        if (obj && currentKey !== undefined) {
            return this.getValueRecursive(obj[currentKey], keys);
        }

        return obj;
    }

    private incrementKeyRecursive(obj: any, key: keyof T | string): void {
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
