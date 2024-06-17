import {Inject, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {DatabaseAuthenticatedOverwritten} from "../../../../supabase/types/supabase.authenticated.modified";
import {TuiAlertService} from "@taiga-ui/core";
import {LoadingState} from "../loadingFeature";
import {SupabaseObjectReturn} from "../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ErrorStoreService} from "../../store-signal-class/error-store.service";

@Injectable({
    providedIn: 'root'
})
export class BaseObjectStore<FunctionName extends keyof DatabaseAuthenticatedOverwritten["authenticated"]["Functions"]> {
    public data: Signal<SupabaseObjectReturn<FunctionName>>;
    protected loadingState_: WritableSignal<LoadingState> = signal({
        loading: true,
        dataRequested: false
    });
    public loadingState: Signal<LoadingState> = this.loadingState_.asReadonly();
    protected data_: WritableSignal<SupabaseObjectReturn<FunctionName>>;
    protected errorStoreService: ErrorStoreService = inject(ErrorStoreService);
    protected tuiAlertService: TuiAlertService = inject(TuiAlertService);

    constructor(@Inject({}) initialData: SupabaseObjectReturn<FunctionName>) {
        this.data_ = signal(initialData);
        this.data = this.data_.asReadonly();
    }

}
