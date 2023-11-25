import {Inject, Injectable, signal, WritableSignal} from '@angular/core';
import {TuiDay} from "@taiga-ui/cdk";
import {WrapperStoreService} from "./wrapper-store.service";
import {PaginationStoreService} from "./pagination-store.service";
import {DictionaryOfBooleans} from "./ui-flag-store.service";

/**
 * Constructs a new instance of an Array Store.
 *
 * @param {boolean} usePagination - Indicates whether pagination is used. Defaults to false, e.g. no pagination.
 * @param {number} step -  The step determines how many store objects are shown on page load and added each time
 * the user scrolls to the bottom. Defaults to 20.
 *  @param {DictionaryOfBooleans} uiFlags - Optional object that contains UI flags associated with the store.
 *  Defaults to an empty object.
 *  @return {ArrayStoreService<StoredObject>}
 */
@Injectable({
    providedIn: 'root'
})
export class ArrayStoreService<StoredObject> extends WrapperStoreService {
    public readonly pagination: PaginationStoreService;
    private displayedObjects: WritableSignal<StoredObject[]> = signal([]);
    private storedObjects: WritableSignal<StoredObject[]> = signal([]);

    constructor(
        @Inject(false) private usePagination: boolean = false,
        @Inject(20) private step: number = 20,
        @Inject({}) private uiFlags: DictionaryOfBooleans = {}
    ) {
        super(uiFlags);
        this.pagination = new PaginationStoreService(this.step);
    }

    /**
     * Gets the objects from the object store.
     *
     * @return {WritableSignal<StoredObject[]>} The array of stored objects.
     */
    public getObjects(): WritableSignal<StoredObject[]> {
        return this.displayedObjects;
    }

    /**
     * Resets the stored objects.
     *
     * @return {void}
     */
    public resetObjects(): void {
        this.displayedObjects.set([]);
    }

    /**
     * Set the objects in the storedObjects and objects properties. Objects are displayed to the user while
     * Stored objects are a backup.
     *
     * If pagination is used, the number of shown objects depends on the defined step size.
     *
     * @param {StoredObject[]} objects - The objects to be set.
     * @return {void}
     */
    public setObjects(objects: StoredObject[]): void {
        if (!this.usePagination) {
            this.storedObjects.set(objects);
            this.displayedObjects.set(objects);
        } else {
            this.storedObjects.set(objects);
            this.displayedObjects.set(this.initialObjectsWithPagination());
        }
    }

    /**
     * Merges a given list of objects with the existing objects.
     *
     * @param {StoredObject[]} objects - The array of stored objects to be merged with already stored objects.
     * @return {void}
     */
    public mutateObjects(objects: StoredObject[]): void {
        const mergeUpdatesWithStoreData: StoredObject[] = [
            ...this.displayedObjects(),
            ...objects
        ]
        this.displayedObjects.set(mergeUpdatesWithStoreData);
        this.storedObjects.set(mergeUpdatesWithStoreData);
    }

    /**
     * Resets the objects displayed to the user.
     *
     * @return {void}
     */
    public resetDisplayedObjects(): void {
        this.displayedObjects.set(this.storedObjects())
    }

    /**
     * Removes objects from the stored and displayed object array.
     *
     * @param {keyof StoredObject} key - The property key to filter on.
     * @param {StoredObject[keyof StoredObject]} value - The property value to filter on.
     * @param {StoredObject[]} array - The optional array to remove objects from. Defaults to the stored objects array.
     * @return {StoredObject[]} - The updated array after removal.
     */
    public removeObjectByPropertyValue(
        key: keyof StoredObject,
        value: StoredObject[keyof StoredObject],
        array: StoredObject[] = this.storedObjects()
    ): StoredObject[] {
        const result: StoredObject[] = array.filter((obj: StoredObject): boolean => obj[key] !== value)
        this.displayedObjects.set(result);
        this.storedObjects.set(result);
        return result;
    }

    /**
     * Handles the scroll event when a user scrolls to the bottom of the page.
     * In that case, a new number of objects is displayed to the user based on the defined pagination step size.
     *
     * @return {void} This function does not return anything.
     */
    public onScrollToBottom(): void {
        this.pagination.incrementTo()
        let to: number = this.pagination.getTo()
        const from: number = to - this.pagination.getStep()
        if (to > this.storedObjects().length) {
            to = this.storedObjects().length
        }
        const dataOfNextVirtualPage: StoredObject[] = this.storedObjects().slice(from, to);
        this.displayedObjects.set(this.displayedObjects().concat(dataOfNextVirtualPage))
    }

    /**
     * Filters an array based on various criteria such as string, tag, and date. If one filter criteria is not
     * given, the criteria is excluded from the search.
     *
     * @param {boolean} filterByString - Determines if the array should be filtered by string.
     * @param {(keyof StoredObject)[]} stringSearchKeys - The keys specifying the properties to be searched
     * for. Multiple keys for can be chosen.
     * @param {string} searchString - The string to be found in the specified properties.
     * @param {boolean} filterByTag - Determines if the array should be filtered by tags.
     * @param {keyof StoredObject} tagSearchKeys - The key specifies the property to be searched.
     * @param {StoredObject[keyof StoredObject][]} tagValues - The tag values to be searched in the specified property.
     * @param {boolean} filterByDateRange - Determines if the array should be filtered by date range.
     * @param {keyof StoredObject} dateSearchKey - The key specifies the property to be searched.
     * @param {Date | TuiDay} startDate - The start date for the date range.
     * @param {Date | TuiDay} endDate - The end date for the date range.
     * @param {WritableSignal<StoredObject[]>} array - The optional array to remove objects from. Defaults to the stored objects array.
     * @return {WritableSignal<StoredObject[]>} The filtered array of objects as signal.
     */
    public filterArray(
        // filterString parameter
        filterByString: boolean = false,
        stringSearchKeys?: (keyof StoredObject)[],
        searchString?: string,
        // filterTag parameter
        filterByTag: boolean = false,
        tagSearchKeys?: keyof StoredObject,
        tagValues?: StoredObject[keyof StoredObject][],
        // filterDate parameter
        filterByDateRange: boolean = false,
        dateSearchKey?: keyof StoredObject,
        startDate?: Date | TuiDay,
        endDate?: Date | TuiDay,
        // General parameter
        array: WritableSignal<StoredObject[]> = this.storedObjects
    ): WritableSignal<StoredObject[]> {
        let results: WritableSignal<StoredObject[]> = array;
        if (filterByString && searchString && stringSearchKeys) {
            results = this.filterMultipleArrayFieldsByString(
                stringSearchKeys,
                searchString,
                results()
            );
        }

        if (filterByTag && tagSearchKeys && tagValues) {
            results = this.filterArrayByDisjunctiveValues(
                tagSearchKeys,
                tagValues,
                results()
            );
        }

        if (filterByDateRange && dateSearchKey && startDate && endDate) {
            results = this.filterArrayByDateRange(
                dateSearchKey,
                startDate,
                endDate,
                results()
            );
        }

        this.displayedObjects.set(results());
        return results;
    }

    /**
     * Filters multiple array fields by a given string.
     *
     * @param {Array<keyof StoredObject>} keys - The keys specifying the properties to be searched.
     * @param {string} searchString - The string to filter the properties by.
     * @param {StoredObject[]} array - The optional array of objects to filter. Defaults to the storedObject.
     * @return {WritableSignal<StoredObject[]>} - The filtered array of objects as signal.
     */
    public filterMultipleArrayFieldsByString(
        keys: (keyof StoredObject)[],
        searchString: string,
        array: StoredObject[] = this.storedObjects()
    ): WritableSignal<StoredObject[]> {
        const lowerSearchString: string = searchString.toLowerCase();
        let arrayToFilter: StoredObject[] = array;
        let finalResults: StoredObject[] = [];

        keys.forEach((key: keyof StoredObject): void => {
            const matches: StoredObject[] = arrayToFilter.filter((item: StoredObject) => {
                    const matchComparison: boolean = String(item[key]).toLowerCase().includes(lowerSearchString)
                    return matchComparison
                }
            );
            const mismatches: StoredObject[] = arrayToFilter.filter((item: StoredObject) => {
                const mismatchComparison: boolean = String(item[key]).toLowerCase().includes(lowerSearchString)
                return !mismatchComparison
            });

            arrayToFilter = mismatches;
            finalResults.push(...matches);
        })
        return signal(finalResults);
    }

    /**
     * Filters an array of objects by disjunctive values, e.g. finds all objects which fulfill one of the provided
     * filter values.
     *
     * @param {keyof StoredObject} key - The key specifying the property to be searched.
     * @param {StoredObject[keyof StoredObject][]} values - An array of values to filter by.
     * @param {StoredObject[]} [array] - The array to filter. Defaults to the stored objects.
     * @return {WritableSignal<StoredObject[]>} - The filtered array of objects as signal.
     */
    public filterArrayByDisjunctiveValues(
        key: keyof StoredObject,
        values: StoredObject[keyof StoredObject][],
        array: StoredObject[] = this.storedObjects()
    ): WritableSignal<StoredObject[]> {
        const filteredResults: StoredObject[] = array.filter((item: StoredObject) => values.includes(item[key]));
        return signal(filteredResults);
    }

    /**
     * Filters an array of StoredObject by a date range.
     *
     * @param {keyof StoredObject} dateKey - The key of the date property to be searched.
     * @param {Date | TuiDay} startDate - The start date of the range.
     * @param {Date | TuiDay} endDate - The end date of the range.
     * @param {StoredObject[]} array - The array of StoredObject to filter. Defaults to the storedObjects.
     * @return {WritableSignal<StoredObject[]>} - The filtered array of objects as signal.
     */
    public filterArrayByDateRange(
        dateKey: keyof StoredObject,
        startDate: Date | TuiDay,
        endDate: Date | TuiDay,
        array: StoredObject[] = this.storedObjects(),
    ): WritableSignal<StoredObject[]> {
        if (endDate instanceof TuiDay) {
            endDate = endDate.toLocalNativeDate()
        }
        if (startDate instanceof TuiDay) {
            startDate = startDate.toLocalNativeDate()
        }
        const startDateNoHours: number = startDate.setHours(0, 0, 0, 0);
        const endDateTransNoHours: number = endDate.setHours(0, 0, 0, 0);
        const results: StoredObject[] = array.filter((item: StoredObject) => {
            const storedDate: Date = new Date(item[dateKey] as Date);
            const storedDateNoHours: number = storedDate.setHours(0, 0, 0, 0);
            const comparison: boolean = (startDateNoHours <= storedDateNoHours) && (storedDateNoHours <= endDateTransNoHours)
            return comparison;
        });
        return signal(results)
    }

    private initialObjectsWithPagination(): StoredObject[] {
        const to: number = this.pagination.getTo()
        const initialData: StoredObject[] = this.storedObjects().slice(0, to);
        return initialData
    }
}
