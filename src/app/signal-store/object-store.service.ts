import {Inject, Injectable, signal, WritableSignal} from '@angular/core';
import {WrapperStoreService} from "./wrapper-store.service";
import {DictionaryOfBooleans} from "./ui-flag-store.service";

// ATTENTION: Type support only for non nested objects
// could not figure out how solve the type support for returned nested supabase types e.g. see GeneratedDatabase or
// how to hide array methods
type pathsToValues<StoredObject> = StoredObject extends Record<string, unknown>
    ? {
        [Key in keyof StoredObject & string]: Key | `${Key}.${pathsToValues<StoredObject[Key]>}`;
    }[keyof StoredObject & string]
    : never;

/**
 * Creates an instance of the Object store. The store stores the specified object type.
 *
 * @param {DictionaryOfBooleans} uiFlags - Optional object that contains UI flags associated with the store. Defaults to an empty
 * object.
 * @return {@return {ObjectStoreService<StoredObject>}} An instance of the Object store.
 */
@Injectable({
    providedIn: 'root'
})
export class ObjectStoreService<StoredObject> extends WrapperStoreService {
    private storedObject: WritableSignal<StoredObject | null> = signal(null);
    private objectId: string | null = null;

    constructor(@Inject({}) private uiFlags: DictionaryOfBooleans = {}) {
        super(uiFlags);
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
        const keyAsString: string = key.toString()
        return this.getValueRecursive(this.storedObject(), keyAsString.split('.'));
    }

    /**
     * Sets the id of the stored object manually (for example to store an url fragment/id.
     *
     * @param {objectId} string - The object id to be stored.
     * @return {void}
     */
    public setObjectId(objectId: string): void {
        this.objectId = objectId;
    }

    /**
     * Retrieve the stored object id.
     *
     * @return string | null The stored object id.
     */
    public getObjectId(): string | null {
        return this.objectId;
    }

    private getValueRecursive(obj: StoredObject | any, keys: string[]): any {
        const currentKey: string | undefined = keys.shift();

        if (obj && currentKey !== undefined) {
            return this.getValueRecursive(obj[currentKey], keys);
        }

        return obj;
    }

    private incrementKeyRecursive(object: any, key: keyof StoredObject | string): void {
        if (object && typeof object === 'object') {
            for (const property in object) {
                if (object.hasOwnProperty(property)) {
                    if (property === key && typeof object[property] === 'number') {
                        object[property]++;
                    } else if (typeof object[property] === 'object') {
                        this.incrementKeyRecursive(object[property], key);
                    }
                }
            }
        }
    }

    private decrementKeyRecursive(object: any, key: keyof StoredObject | string): void {
        if (object && typeof object === 'object') {
            for (const property in object) {
                if (object.hasOwnProperty(property)) {
                    if (property === key && typeof object[property] === 'number') {
                        object[property]--;
                    } else if (typeof object[property] === 'object') {
                        this.decrementKeyRecursive(object[property], key);
                    }
                }
            }
        }
    }

}
