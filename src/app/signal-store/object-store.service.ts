import {Injectable, signal, WritableSignal} from '@angular/core';
import {WrapperStoreService} from "./wrapper-store.service";

// ATTENTION: Type support only for non nested objects
// could not figure out how solve the type support for returned nested supabase types e.g. see GeneratedDatabase or
// how to hide array methods
type pathsToValues<StoredObject> = StoredObject extends Record<string, unknown>
    ? {
        [Key in keyof StoredObject & string]: Key | `${Key}.${pathsToValues<StoredObject[Key]>}`;
    }[keyof StoredObject & string]
    : never;

@Injectable({
    providedIn: 'root'
})
export class ObjectStoreService<StoredObject, UiFlags extends Record<string, WritableSignal<boolean>>> extends WrapperStoreService<UiFlags> {
    private storedObject: WritableSignal<StoredObject | null> = signal(null);

    constructor() {
        super();
    }

    /**
     * Retrieve the stored object.
     *
     * @return {WritableSignal<StoredObject | null>} The stored object as signal which notifies consumers of changes.
     */
    public getObject(): WritableSignal<StoredObject | null> {
        return this.storedObject;
    }

    /**
     * Sets the given object in the store.
     *
     * @param {StoredObject} object - The object to be stored.
     * @return {void}
     */
    public setObject(object: StoredObject): void {
        this.storedObject.set(object);
    }

    /**
     * Resets the object to null.
     *
     * @return {void}
     */
    public resetObject(): void {
        this.storedObject.set(null);
    }

    /**
     * Mutates an object by merging it with the stored object and updating the stored object.
     *
     * @param {StoredObject} object - The object to merge with the stored object.
     * @return
     */
    public mutateObject(object: StoredObject): void {
        const mergeUpdatesWithStoreData: StoredObject = {
            ...this.storedObject(),
            ...object
        };
        this.storedObject.set(mergeUpdatesWithStoreData);
    }

    /**
     * Increments the value of a given key by 1.
     *
     * @param {keyof StoredObject | string} key - The key to increment the value of.
     * @return
     */
    public incrementKey(key: keyof StoredObject | string): void {
        console.log('in function')
        if (this.storedObject()) {
            this.incrementKeyRecursive(this.storedObject(), key);
        }
    }

    /**
     * Decrements the value of a given key by 1.
     *
     * @param {keyof StoredObject | string} key - The key to decrement the value of.
     * @return {void}
     */
    public decrementKey(key: keyof StoredObject | string): void {
        if (this.storedObject()) {
            this.decrementKeyRecursive(this.storedObject(), key);
        }
    }

    /**
     * Retrieves the value associated with the given key from the stored object.
     *
     * @param {keyof StoredObject | pathsToValues<StoredObject>} key - The key to search for in the stored object.
     *        It can either be a direct key or a path, e.g. a nested object key to the value in the stored object.
     * @return {any} The value associated with the given key in the stored object.
     */
    public getValueByKey(key: keyof StoredObject | pathsToValues<StoredObject>): any {
        const keyAsString = key.toString()
        return this.getValueRecursive(this.storedObject(), keyAsString.split('.'));
    }

    private getValueRecursive(obj: StoredObject | any, keys: string[]): any {
        const currentKey = keys.shift();

        if (obj && currentKey !== undefined) {
            return this.getValueRecursive(obj[currentKey], keys);
        }

        return obj;
    }

    private incrementKeyRecursive(obj: any, key: keyof StoredObject | string): void {
        if (obj && typeof obj === 'object') {
            for (const prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (prop === key && typeof obj[prop] === 'number') {
                        obj[prop]++;
                        console.log('new value', obj[prop])
                    } else if (typeof obj[prop] === 'object') {
                        this.incrementKeyRecursive(obj[prop], key);
                    }
                }
            }
        }
    }

    private decrementKeyRecursive(obj: any, key: keyof StoredObject | string): void {
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
