import {WritableSignal} from '@angular/core';

/**
 * Removes objects from the stored and displayed object array based on a specific property value.
 *
 * @param {keyof StoredObject} key - The property key to filter on.
 * @param {StoredObject[keyof StoredObject]} value - The property value to filter on.
 * @param {WritableSignal<StoredObject[]>} array - The signal representing the array to remove objects from.
 * @return {StoredObject[]} - The updated array after removal.
 */
export function removeObjectByPropertyValue<StoredObject>(
    key: keyof StoredObject,
    value: StoredObject[keyof StoredObject],
    array: WritableSignal<StoredObject[]>
): StoredObject[] {
    const result: StoredObject[] = array().filter((obj: StoredObject): boolean => obj[key] !== value);
    array.set(result);
    return result;
}
