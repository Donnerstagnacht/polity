import {computed, Inject, inject, Injectable, InjectionToken, Signal, signal, WritableSignal} from '@angular/core';
import {DatabaseAuthenticatedOverwritten} from '../../../../supabase/types/supabase.authenticated.modified';
import {TuiAlertService} from '@taiga-ui/core';
import {LoadingState} from '../loadingFeature';
import {filterArray, FilterState} from './filterFeature';
import {ErrorStoreService} from '../error-store.service';

export const INITIAL_LOADING_STATE = new InjectionToken<LoadingState>('LOADING_STATE');

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

    protected filterState: WritableSignal<FilterState<FunctionName>> = signal({
        filterByString: false,
        stringSearchKeys: [],
        searchString: '',
        // filterTag parameter
        filterByTag: false,
        tagSearchKeys: undefined,
        tagValues: [],
        // filterDate parameter
        filterByDateRange: false,
        dateSearchKey: undefined,
        startDate: new Date(),
        endDate: new Date()
    });
    public dataFiltered: Signal<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns'] | []> = computed(() => {
        return filterArray<
            DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']
        >(
            this.data(),
            this.filterState().filterByString,
            this.filterState().stringSearchKeys,
            this.filterState().searchString,
            this.filterState().filterByTag,
            this.filterState().tagSearchKeys,
            this.filterState().tagValues,
            this.filterState().filterByDateRange,
            this.filterState().dateSearchKey,
            this.filterState().startDate,
            this.filterState().endDate
        );
    });

    protected errorStoreService: ErrorStoreService = inject(ErrorStoreService);
    protected tuiAlertService: TuiAlertService = inject(TuiAlertService);

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

    public resetState(): void {
        this.data_.set([]);
    }
}
