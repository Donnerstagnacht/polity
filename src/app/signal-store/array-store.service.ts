import {Inject, Injectable, signal, WritableSignal} from '@angular/core';
import {TuiDay} from "@taiga-ui/cdk";
import {WrapperStoreService} from "./wrapper-store.service";
import {PaginationStoreService} from "./pagination-store.service";

@Injectable({
    providedIn: 'root'
})
export class ArrayStoreService<StoredObject, UiFlags extends Record<string, WritableSignal<boolean>>> extends WrapperStoreService<UiFlags> {
    public readonly pagination: PaginationStoreService;
    private entities: WritableSignal<StoredObject[]> = signal([]);
    private storedEntities: WritableSignal<StoredObject[]> = signal([]);

    /**
     * Constructs a new ArrayStore Instance.
     *
     * @param {boolean} usePagination - Indicates whether pagination is used.
     * @param {number} step -  The step determines how many store objects are shown on page load and added if
     * the user scrolls to the bottom.
     */
    constructor(
        @Inject(false) private usePagination: boolean = false,
        @Inject(20) private step: number = 20
    ) {
        super();
        this.pagination = new PaginationStoreService(this.step);
        console.log('ArrayStoreService', this.usePagination);
    }

    getEntities(): WritableSignal<StoredObject[]> {
        return this.entities;
    }

    resetEntities(): void {
        this.entities.set([]);
    }

    setEntities(entities: StoredObject[]): void {
        if (!this.usePagination) {
            this.storedEntities.set(entities);
            this.entities.set(entities);
            //after set
            console.log('no pagination', this.entities())
        } else {
            this.storedEntities.set(entities);
            console.log('initialLength', this.storedEntities().length)
            this.entities.set(this.initialEntitiesWithPagination());
            console.log('pagination', this.entities())
        }
    }

    mutateEntities(entities: StoredObject[]): void {
        const mergeUpdatesWithStoreData: StoredObject[] = [
            ...this.entities(),
            ...entities
        ]
        this.entities.set(mergeUpdatesWithStoreData);
        this.storedEntities.set(mergeUpdatesWithStoreData);
    }

    public resetFilteredEntities(): void {
        this.entities.set(this.storedEntities())
    }

    removeObjectByPropertyValue(
        key: keyof StoredObject,
        value: StoredObject[keyof StoredObject],
        array: StoredObject[] = this.storedEntities()
    ): StoredObject[] {
        const result: StoredObject[] = array.filter(obj => obj[key] !== value)
        this.entities.set(result);
        this.storedEntities.set(result);
        return result;
    }

    onSrollToBottom() {
        this.pagination.incrementTo()
        console.log('start and end not provided')
        let to = this.pagination.getTo()
        const from = to - this.pagination.getStep()
        if (to > this.storedEntities().length) {
            to = this.storedEntities().length
        }
        console.log('fetched pagination', from, to)
        const dataOfNextVirtualPage: StoredObject[] = this.storedEntities().slice(from, to);
        console.log(dataOfNextVirtualPage)
        const newData = this.entities().concat(dataOfNextVirtualPage)
        console.log('length', newData.length, to)
        this.entities.set(this.entities().concat(dataOfNextVirtualPage))
    }

    filterArray(
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
        dateSearchKeys?: keyof StoredObject,
        startDate?: Date | TuiDay,
        endDate?: Date | TuiDay,
        // General parameter
        array: WritableSignal<StoredObject[]> = this.storedEntities
    ): WritableSignal<StoredObject[]> {
        let results: WritableSignal<StoredObject[]> = array;
        // console.log('before', results())
        console.log('before', results().length)
        if (filterByString && searchString && stringSearchKeys) {
            results = this.filterMultipleArrayFieldsByString(
                stringSearchKeys,
                searchString,
                results()
            );
        }
        // console.log('after string', results())
        console.log('after string', results().length)

        if (filterByTag && tagSearchKeys && tagValues) {
            results = this.filterArrayByDisjunctiveValues(
                tagSearchKeys,
                tagValues,
                results()
            );
        }
        // console.log('after tag', results())
        console.log('after tag', results().length)

        if (filterByDateRange && dateSearchKeys && startDate && endDate) {
            results = this.filterArrayByDateRange(
                dateSearchKeys,
                startDate,
                endDate,
                results()
            );
        }
        // console.log('after datess', results())
        console.log('after dates', results().length)

        this.entities.set(results());
        return results;
    }

    filterMultipleArrayFieldsByString(
        keys: (keyof StoredObject)[],
        searchString: string,
        array: StoredObject[] = this.storedEntities()
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
            // console.log('in run mismatches', mismatches.length)
            // console.log('in run matches', matches.length)
            // console.log('run', finalResults.length)

            arrayToFilter = mismatches;
            finalResults.push(...matches);
        })
        return signal(finalResults);
    }

    filterArrayByDisjunctiveValues(
        key: keyof StoredObject,
        values: StoredObject[keyof StoredObject][],
        array: StoredObject[] = this.entities()
    ): WritableSignal<StoredObject[]> {
        const filteredResults: StoredObject[] = array.filter((item: StoredObject) => values.includes(item[key]));
        return signal(filteredResults);
    }

    filterArrayByDateRange(
        dateKey: keyof StoredObject,
        startDate: Date | TuiDay,
        endDate: Date | TuiDay,
        array: StoredObject[] = this.entities(),
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
            // console.log('startdate ', startDate, ' <= ', 'datevalue && ', storedDate, ' dateValue <=', ' endDate ', endDate, ' == ', comparison);
            return comparison;
        });
        return signal(results)
    }

    private initialEntitiesWithPagination(): StoredObject[] {
        const to: number = this.pagination.getTo()
        const initialData: StoredObject[] = this.storedEntities().slice(0, to);
        return initialData
    }
}
