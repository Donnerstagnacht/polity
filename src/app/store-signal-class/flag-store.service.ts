import {Inject, Injectable, WritableSignal} from '@angular/core';

/**
 * Constructs a new instance UI flag store instance.
 *
 * @param {type} initialUiFlags - A dictionary (key: string, value: WritableSignal<boolean>) of Ui flags
 * @return {FlagStoreService}
 */
@Injectable({
    providedIn: 'root'
})
export class FlagStoreService<FlagKeyList extends string = string> {
    private readonly uiFlags: Record<FlagKeyList, WritableSignal<boolean>>;

    constructor(@Inject({}) private readonly initialUiFlags: Record<FlagKeyList, WritableSignal<boolean>>) {
        this.uiFlags = this.initialUiFlags;
    }

    /**
     * Set the specified UI flag to true.
     *
     * @param {keyof FlagKeyList} key - The key of the flag to set.
     * @return {void}
     */
    setFlagTrue(key: FlagKeyList): void {
        const flag: WritableSignal<boolean> = this.uiFlags[key];
        flag.set(true)
    }

    /**
     * Sets the specified UI flag to false.
     *
     * @param {key of FlagKeyList} key - The key of the flag to be set.
     * @return {void}
     */
    setFlagFalse(key: FlagKeyList): void {
        const flag: WritableSignal<boolean> = this.uiFlags[key];
        flag.set(false)
    }

    /**
     * Gets the value of a specified UI flag.
     *
     * @param {key of FlagKeyList} key - The key of the UI flag to retrieve.
     * @return {WritableSignal<boolean>} - The value of the UI flag as signal that notifies consumers of UI flag changes
     */
    getFlag(key: FlagKeyList): WritableSignal<boolean> {
        return this.uiFlags[key];
    }
}
