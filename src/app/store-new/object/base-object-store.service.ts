import {inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {DatabaseAuthenticatedOverwritten} from "../../../supabase/types/supabase.authenticated.modified";
import {TuiAlertService} from "@taiga-ui/core";
import {ErrorStoreService} from "../signal-store/error-store.service";
import {LoadingState} from "./loadingFeature";
import {SupabaseObjectReturn} from "../../../supabase/types/supabase.authenticated.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class BaseObjectStore<FunctionName extends keyof DatabaseAuthenticatedOverwritten["authenticated"]["Functions"]> {
    protected loadingState_: WritableSignal<LoadingState> = signal({
        loading: false,
        dataRequested: false
    });
    public loadingState: Signal<LoadingState> = this.loadingState_.asReadonly();

    protected data_: WritableSignal<SupabaseObjectReturn<FunctionName> | null> = signal(null);
    public data: Signal<SupabaseObjectReturn<FunctionName> | null> = this.data_.asReadonly();

    protected errorStoreService: ErrorStoreService = inject(ErrorStoreService);
    protected tuiAlertService: TuiAlertService = inject(TuiAlertService);

}
