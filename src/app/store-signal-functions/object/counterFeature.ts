import {WritableSignal} from "@angular/core";

export type NumberKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T];

export function increment<FlexibleObject>(objectIn: WritableSignal<FlexibleObject>, key: NumberKeys<FlexibleObject>) {
    objectIn.set({...objectIn(), [key]: (objectIn()[key]) as number + 1});

}

export function decrement<FlexibleObject>(object: WritableSignal<FlexibleObject>, key: NumberKeys<FlexibleObject>) {
    object.set({...object(), [key]: (object()[key]) as number - 1});
}

