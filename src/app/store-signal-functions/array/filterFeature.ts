import {DatabaseAuthenticatedOverwritten} from "../../../../supabase/types/supabase.authenticated.modified";
import {TuiDay} from "@taiga-ui/cdk";
import {SupabaseObjectReturn} from "../../../../supabase/types/supabase.authenticated.shorthand-types";

export type FilterState<FunctionName extends keyof DatabaseAuthenticatedOverwritten["authenticated"]["Functions"]> = {
    filterByString: boolean,
    stringSearchKeys: (keyof SupabaseObjectReturn<FunctionName>)[],
    searchString: string,
    // filterTag parameter,
    filterByTag?: boolean,
    tagSearchKeys?: keyof SupabaseObjectReturn<FunctionName>,
    tagValues?: SupabaseObjectReturn<FunctionName>[keyof SupabaseObjectReturn<FunctionName>][],
    // filterDate parameter
    filterByDateRange?: boolean,
    dateSearchKey?: keyof SupabaseObjectReturn<FunctionName>,
    startDate?: Date | TuiDay,
    endDate?: Date | TuiDay
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
export function filterArray<StoredObject>(
    // filterString parameter
    array: StoredObject[],
    // filterState: FilterState<any>
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
    endDate?: Date | TuiDay
): StoredObject[] {
    let results: StoredObject[] = array;
    if (filterByString && searchString && stringSearchKeys) {
        results = filterMultipleArrayFieldsByString(
            stringSearchKeys,
            searchString,
            results
        );
    }

    if (filterByTag && tagSearchKeys && tagValues) {
        results = filterArrayByDisjunctiveValues(
            tagSearchKeys,
            tagValues,
            results
        );
    }

    if (filterByDateRange && dateSearchKey && startDate && endDate) {
        results = filterArrayByDateRange(
            dateSearchKey,
            startDate,
            endDate,
            results
        );
    }
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
export function filterMultipleArrayFieldsByString<StoredObject>(
    keys: (keyof StoredObject)[],
    searchString: string,
    array: StoredObject[]
): StoredObject[] {
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
    return finalResults
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
export function filterArrayByDisjunctiveValues<StoredObject>(
    key: keyof StoredObject,
    values: StoredObject[keyof StoredObject][],
    array: StoredObject[]
): StoredObject[] {
    const filteredResults: StoredObject[] = array.filter((item: StoredObject) => values.includes(item[key]));
    return filteredResults
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
export function filterArrayByDateRange<StoredObject>(
    dateKey: keyof StoredObject,
    startDate: Date | TuiDay,
    endDate: Date | TuiDay,
    array: StoredObject[],
): StoredObject[] {
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
    return results
}
