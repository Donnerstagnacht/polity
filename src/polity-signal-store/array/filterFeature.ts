import {TuiDay} from '@taiga-ui/cdk';
import {FilterByDateRangeState, FilterByStringState, FilterByTagState} from '../types/filterState.type';

/**
 * Filters an array of StoredObject based on the provided filter states.
 * Each filter states consists out of a flag if the filter is applied, an array of keys which should be searched and the filter values (strings, tags or dates)
 *
 * @param {StoredObject[]} array - The array of StoredObject to filter.
 * @param {FilterByStringState<StoredObject>} filterByStringState - The filter state for string search.
 * @param {FilterByTagState<StoredObject> | undefined} [filterByTagState] - The filter state for tag search.
 * @param {FilterByDateRangeState<StoredObject> | undefined} [filterByDateRangeState] - The filter state for date range search.
 * @return {StoredObject[]} - The filtered array of objects.
 */
export function filterArray<StoredObject>(
    array: StoredObject[],
    filterByStringState: FilterByStringState<StoredObject>,
    filterByTagState?: FilterByTagState<StoredObject>,
    filterByDateRangeState?: FilterByDateRangeState<StoredObject>
): StoredObject[] {
    let results: StoredObject[] = array;
    if (filterByStringState.filterByString && filterByStringState.searchString && filterByStringState.stringSearchKeys) {
        results = filterMultipleArrayFieldsByString(
            filterByStringState.stringSearchKeys,
            filterByStringState.searchString,
            results
        );
    }

    if (filterByTagState?.filterByTag && filterByTagState.tagSearchKeys && filterByTagState.tagValues) {
        results = filterArrayByDisjunctiveValues(
            filterByTagState.tagSearchKeys,
            filterByTagState.tagValues,
            results
        );
    }

    if (filterByDateRangeState?.filterByDateRange && filterByDateRangeState.dateSearchKey && filterByDateRangeState.startDate && filterByDateRangeState.endDate) {
        results = filterArrayByDateRange(
            filterByDateRangeState.dateSearchKey,
            filterByDateRangeState.startDate,
            filterByDateRangeState.endDate,
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
                const matchComparison: boolean = String(item[key]).toLowerCase().includes(lowerSearchString);
                return matchComparison;
            }
        );
        const mismatches: StoredObject[] = arrayToFilter.filter((item: StoredObject) => {
            const mismatchComparison: boolean = String(item[key]).toLowerCase().includes(lowerSearchString);
            return !mismatchComparison;
        });

        arrayToFilter = mismatches;
        finalResults.push(...matches);
    });
    return finalResults;
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
    return filteredResults;
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
    array: StoredObject[]
): StoredObject[] {
    if (endDate instanceof TuiDay) {
        endDate = endDate.toLocalNativeDate();
    }
    if (startDate instanceof TuiDay) {
        startDate = startDate.toLocalNativeDate();
    }
    const startDateNoHours: number = startDate.setHours(0, 0, 0, 0);
    const endDateTransNoHours: number = endDate.setHours(0, 0, 0, 0);
    const results: StoredObject[] = array.filter((item: StoredObject) => {
        const storedDate: Date = new Date(item[dateKey] as Date);
        const storedDateNoHours: number = storedDate.setHours(0, 0, 0, 0);
        const comparison: boolean = (startDateNoHours <= storedDateNoHours) && (storedDateNoHours <= endDateTransNoHours);
        return comparison;
    });
    return results;
}
