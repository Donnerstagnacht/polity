import {Inject, Injectable, WritableSignal} from '@angular/core';

export type DictionaryOfBooleans = Record<string, WritableSignal<boolean>>

@Injectable({
    providedIn: 'root'
})
export class UiFlagStoreService {
    private uiFlags: DictionaryOfBooleans = {};

    /**
     * Constructs a new instance UI flag store instance.
     *
     * @param {type} initialUiFlags - A dictionary (key: string, value: WritableSignal<boolean>) of Ui flags
     * @return {UiFlagStoreService}
     */
    constructor(@Inject({}) private readonly initialUiFlags: DictionaryOfBooleans = {}) {
        this.uiFlags = this.initialUiFlags;
    }

    /**
     * Set the specified UI flag to true.
     *
     * @param {keyof DictionaryOfBooleans} key - The key of the flag to set.
     * @return {void}
     */
    setUiFlagTrue(key: keyof DictionaryOfBooleans): void {
        const flag: WritableSignal<boolean> = this.uiFlags[key];
        flag.set(true)
    }

    /**
     * Sets the specified UI flag to false.
     *
     * @param {keyof DictionaryOfBooleans} key - The key of the flag to be set.
     * @return {void}
     */
    setUiFlagFalse(key: keyof DictionaryOfBooleans): void {
        const flag: WritableSignal<boolean> = this.uiFlags[key];
        flag.set(false)
    }

    /**
     * Gets the value of a specified UI flag.
     *
     * @param {keyof DictionaryOfBooleans} key - The key of the UI flag to retrieve.
     * @return {WritableSignal<boolean>} - The value of the UI flag as signal that notifies consumers of UI flag changes
     */
    getUiFlag(key: keyof DictionaryOfBooleans): WritableSignal<boolean> {
        return this.uiFlags[key];
    }

}
