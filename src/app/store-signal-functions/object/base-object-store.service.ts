import {Inject, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {DatabaseAuthenticatedOverwritten} from '../../../../supabase/types/supabase.authenticated.modified';
import {TuiAlertService} from '@taiga-ui/core';
import {LoadingState} from '../loadingFeature';
import {SupabaseObjectReturn} from '../../../../supabase/types/supabase.authenticated.shorthand-types';
import {INITIAL_LOADING_STATE} from '../array/base-array-store.service';
import {ErrorStoreService} from '../error-store.service';

@Injectable({
    providedIn: 'root'
})
export class BaseObjectStore<FunctionName extends keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions']> {
    public data: Signal<SupabaseObjectReturn<FunctionName>>;
    public loadingState: Signal<LoadingState>;
    protected loadingState_: WritableSignal<LoadingState>;
    protected data_: WritableSignal<SupabaseObjectReturn<FunctionName>>;
    protected errorStoreService: ErrorStoreService = inject(ErrorStoreService);
    protected tuiAlertService: TuiAlertService = inject(TuiAlertService);

    constructor(
        @Inject({}) initialDataState: SupabaseObjectReturn<FunctionName>,
        @Inject(INITIAL_LOADING_STATE) private initialLoadingState: LoadingState = {
            loading: true,
            dataRequested: false
        }
    ) {
        this.data_ = signal(initialDataState);
        this.data = this.data_.asReadonly();
        this.loadingState_ = signal(initialLoadingState);
        this.loadingState = this.loadingState_.asReadonly();
    }
}
