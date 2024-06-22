import {WritableSignal} from '@angular/core';

type NumberKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T];

/**
 * Increments the value of a specified key in a writable signal object.
 *
 * @template FlexibleObject - The type of the object that the writable signal holds.
 * @param {WritableSignal<FlexibleObject>} objectIn - The writable signal object.
 * @param {NumberKeys<FlexibleObject>} key - The key to increment.
 * @return {void} This function does not return anything.
 */
export function increment<FlexibleObject>(objectIn: WritableSignal<FlexibleObject>, key: NumberKeys<FlexibleObject>) {
    objectIn.set({...objectIn(), [key]: (objectIn()[key]) as number + 1});

}

/**
 * Decrements the value of a specified key in a writable signal object.
 *
 * @template FlexibleObject - The type of the object that the writable signal holds.
 * @param {WritableSignal<FlexibleObject>} object - The writable signal object.
 * @param {NumberKeys<FlexibleObject>} key - The key to decrement.
 * @return {void} This function does not return anything.
 */
export function decrement<FlexibleObject>(object: WritableSignal<FlexibleObject>, key: NumberKeys<FlexibleObject>) {
    object.set({...object(), [key]: (object()[key]) as number - 1});
}


