import {computed, Inject, inject, Injectable, InjectionToken, Signal, signal, WritableSignal} from '@angular/core';
import {DatabaseAuthenticatedOverwritten} from '../../../supabase/types/supabase.authenticated.modified';
import {TuiAlertService} from '@taiga-ui/core';
import {filterArray} from './filterFeature';
import {ErrorStoreService} from '../error-store.service';
import {LoadingState} from '../types/loadingState.type';
import {FilterState} from '../types/filterState.type';


export const INITIAL_LOADING_STATE = new InjectionToken<LoadingState>('LOADING_STATE');

/**
 * Constructs a new instance of an array store.
 * @property {WritableSignal<LoadingState>} loadingState - The loading state of the array.
 * @property {WritableSignal<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']>} data - The return of the supabase rpc, e.g. an array.
 * @property {WritableSignal<FilterState<FunctionName>>} filterState - The filter state of the array.
 * @property {WritableSignal<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']>} filteredData - The return of the supabase rpc filtered by the filter state.
 * @method setFilterState - Sets the filter state of the array and by doing so the filteredData property.
 * @method resetFilterState - Resets the filter state of the array and by doing so the filteredData property.
 */
@Injectable({
    providedIn: 'root'
})
export class BaseArrayStore<FunctionName extends keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions']> {
    public loadingState: Signal<LoadingState> = signal({
        loading: true,
        dataRequested: false
    });
    protected loadingState_: WritableSignal<LoadingState>
        = signal({loading: true, dataRequested: false});
    protected data_: WritableSignal<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']> = signal([]);
    public data: Signal<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']> = this.data_.asReadonly();
    protected errorStoreService: ErrorStoreService = inject(ErrorStoreService);
    protected tuiAlertService: TuiAlertService = inject(TuiAlertService);
    private initialFilterState: FilterState<keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions']> = {
        filterByStringState: {
            filterByString: false,
            stringSearchKeys: [],
            searchString: ''
        },
        filterByTagState: {
            filterByTag: false,
            tagSearchKeys: undefined,
            tagValues: []
        },
        filterByDateRangeState: {
            filterByDateRange: false,
            dateSearchKey: undefined,
            startDate: new Date(),
            endDate: new Date()
        }
    };
    protected filterState: WritableSignal<FilterState<FunctionName>> = signal(this.initialFilterState);
    public dataFiltered: Signal<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns'] | []> = computed(() => {
        return filterArray<
            DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']
        >(
            this.data(),
            this.filterState().filterByStringState,
            this.filterState().filterByTagState,
            this.filterState().filterByDateRangeState
        );
    });

    constructor(@Inject(INITIAL_LOADING_STATE) private initialLoadingState: LoadingState = {
                    loading: true,
                    dataRequested: false
                }
    ) {
        this.loadingState_ = signal(initialLoadingState);
        this.loadingState = this.loadingState_.asReadonly();
    }

    public setFilterState(filterState: FilterState<FunctionName>): void {
        this.filterState.set(filterState);
    }

    public emptyStore(): void {
        this.data_.set([]);
    }

    public resetFilterState(): void {
        this.setFilterState(this.initialFilterState);
    }
}
