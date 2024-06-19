import {computed, Signal, WritableSignal} from '@angular/core';

export type LoadingState = {
    loading: boolean,
    dataRequested: boolean
}


export function loadingStarted(loadingState: WritableSignal<LoadingState>) {
    loadingState.set({
        ...loadingState(),
        loading: true,
        dataRequested: true
    });
}

export function loadingStopped(loadingState: WritableSignal<LoadingState>) {
    loadingState.set({...loadingState(), loading: false});
}

export function checkIfDataFound
(
    data: WritableSignal<any>,
    loadingState: WritableSignal<LoadingState>
): Signal<boolean> {
    return computed((): boolean => {
        if (data().length > 0) {
            return false;
        } else {
            return true;
        }
    });
}


// type BooleanKeys<T> = {
//     [K in keyof T]: T[K] extends boolean ? K : never
// }[keyof T];


// export function loadingStarted<FlexibleObject>(object: WritableSignal<FlexibleObject>, key: BooleanKeys<FlexibleObject>) {
//     object.set({...object(), [key]: true});
// }
//
// export function loadingStopped<FlexibleObject>(object: WritableSignal<FlexibleObject>, key: BooleanKeys<FlexibleObject>) {
//     object.set({...object(), [key]: false});
// }

// export function loadingStarted<FlexibleObject>(object: WritableSignal<boolean>) {
//     object.set(true);
// }
//
// export function loadingStopped<FlexibleObject>(object: WritableSignal<boolean>) {
//     object.set(false);
// }

