import {Injectable, WritableSignal} from '@angular/core';

export type uiFlag = {
    key: string,
    value: WritableSignal<boolean>
}

export interface BooleanDictionary {
    [key: string]: WritableSignal<boolean>;
}

@Injectable({
    providedIn: 'root'
})
export class UiFlagStoreService<T extends Record<string, WritableSignal<boolean>>> {
    // private uiFlags: WritableSignal<BooleanDictionary> = signal({})
    private uiFlags: T = {} as T

    constructor() {
    }

    // public getUiFlags(): WritableSignal<BooleanDictionary> {
    //     return this.uiFlags;
    // }

    public getUiFlags(): T {
        return this.uiFlags;
    }

    // public setUiFlags(uiFlags: uiFlag[]): void {
    //     this.uiFlags.set(uiFlags)
    // }

    // public setUiFlags(uiFlags: BooleanDictionary): void {
    //     this.uiFlags.set(uiFlags)
    // }

    public setUiFlags(uiFlags: T): void {
        this.uiFlags = uiFlags
    }


    // public resetUiFlags(): void {
    //     this.uiFlags.set([])
    // }

    // public resetUiFlags(): void {
    //     this.uiFlags.set({})
    // }

    // public addUiFlag(key: string, value: boolean): void {
    //     this.uiFlags().push({
    //         key: key,
    //         value: signal(value)
    //     })
    // }

    // public removeUiFlag(key: string): void {
    //     const indexToRemove: number = this.uiFlags().findIndex((flag: uiFlag): boolean => flag.key === key);
    //     this.uiFlags().splice(indexToRemove, 1);
    // }

    // setUiFlagTrue(key: string): void {
    //     const flag: uiFlag | undefined = this.findUiFlag(key)
    //     if (flag) {
    //         flag.value.set(true)
    //     }
    // }

    // setUiFlagTrue(key: string): void {
    //     const flag = this.uiFlags()[key];
    //     flag.set(true)
    //
    // }

    setUiFlagTrue(key: keyof T): void {
        const flag = this.uiFlags[key];
        flag.set(true)

    }

    setUiFlagFalse(key: keyof T): void {
        const flag = this.uiFlags[key];
        flag.set(false)

    }

    // setUiFlagFalse(key: string): void {
    //     const flag: uiFlag | undefined = this.findUiFlag(key)
    //     if (flag) {
    //         flag.value.set(false)
    //     }
    // }

    // setUiFlagFalse(key: string): void {
    //     const flag = this.uiFlags()[key];
    //     flag.set(false)
    // }

    // toggleFlagValue(key: string): void {
    //     const flag = this.uiFlags()[key];
    //     flag.set(!flag())
    // }

    // public mutateUiFlag(uiFlags: BooleanDictionary): void {
    //     const mergeUpdatesWithStoreData: BooleanDictionary = {
    //         ...this.uiFlags(),
    //         ...uiFlags
    //     }
    //     this.uiFlags.set(mergeUpdatesWithStoreData);
    // }

    // removeObjectByPropertyValue(
    //     value: string,
    // ): uiFlag[] {
    //     const result: uiFlag[] = this.uiFlags().filter((flag: uiFlag): boolean => flag.key !== value)
    //     this.uiFlags.set(result);
    //     return result;
    // }

    // public getUiFlag(key: string): uiFlag {
    //     const flag: uiFlag | undefined = this.findUiFlag(key) as uiFlag
    //     return flag
    // }

    // public getUiFlag(key: keyof BooleanDictionary): WritableSignal<boolean> {
    //     const flag: WritableSignal<boolean> = this.uiFlags()[key]
    //     return flag
    // }

    getUiFlag(key: keyof T): WritableSignal<boolean> {
        return this.uiFlags[key];
    }

    // private findUiFlag(key: string): uiFlag | undefined {
    //     const flag: uiFlag | undefined = this.uiFlags().find((flag: uiFlag): boolean => {
    //         return flag.key === key;
    //     })
    //     return flag
    // }

    // findBooleanValue<T extends Record<string, boolean>>(dictionary: T, keyToFind: keyof T): boolean | undefined {
    //     return dictionary[keyToFind];
    // }
}
