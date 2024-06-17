import {AuthenticatedSchema} from "../../../../supabase/types/supabase.authenticated.shorthand-types";
import {PostgrestResponseFailure, PostgrestResponseSuccess} from "@supabase/postgrest-js";
import {DatabaseAuthenticatedOverwritten} from "../../../../supabase/types/supabase.authenticated.modified";
import {loadingStarted, LoadingState, loadingStopped} from "../loadingFeature";
import {signal, WritableSignal} from "@angular/core";
import {showAlert} from "../alertFeature";
import {TuiAlertService} from "@taiga-ui/core";
import {updateErrorGlobal} from "../errorFeature";
import {rpcArray} from "./rpcArrayFeature";
import {ErrorStoreService} from "../../store-signal-class/error-store.service";

type SupabaseConfig<
    FunctionName extends string & keyof AuthenticatedSchema['Functions'],
    Function_ extends AuthenticatedSchema['Functions'][FunctionName],
> = {
    fn: FunctionName,
    args?: Function_['Args'],
    options?: {
        head?: boolean
        count?: 'exact' | 'planned' | 'estimated'
    },
}

type LoadingConfig = {
    useLoading?: boolean
    loadingState?: WritableSignal<LoadingState>
}

type StoreConfig<FunctionName extends string & keyof AuthenticatedSchema['Functions']> = {
    useStore?: boolean
    dataState?: WritableSignal<DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]>
    defaultReturn?: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"] | [] | {}
}

type SuccessConfig = {
    useSuccess?: boolean
    alertService?: TuiAlertService,
    successMessage?: string
}

type ErrorConfig = {
    useError?: boolean
    errorStoreService?: ErrorStoreService
}

export async function rpcArrayHandler<
    FunctionName extends string & keyof AuthenticatedSchema['Functions'],
    Function_ extends AuthenticatedSchema['Functions'][FunctionName],
>(
    supabaseConfig: SupabaseConfig<FunctionName, Function_>,
    loadingConfig: LoadingConfig = {
        useLoading: false
    },
    storeConfig: StoreConfig<FunctionName> = {
        useStore: false
    },
    errorConfig: ErrorConfig = {
        useError: false
    },
    successConfig: SuccessConfig = {
        useSuccess: false
    }
) {
    if (loadingConfig.useLoading && loadingConfig.loadingState) {
        loadingStarted(loadingConfig.loadingState)
    }
    const rpcReturn: PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]> | PostgrestResponseFailure = await rpcArray(
        supabaseConfig.fn,
        supabaseConfig.args,
        supabaseConfig.options
    )

    if (errorConfig.useError && errorConfig.errorStoreService && rpcReturn.error) {
        updateErrorGlobal(
            rpcReturn.error.message,
            true,
            errorConfig.errorStoreService
        )
    }

    if (successConfig.useSuccess && successConfig.alertService && !rpcReturn.error) {
        showAlert(
            successConfig.alertService,
            successConfig.successMessage
        )
    }

    let returnData = storeConfig.defaultReturn;
    if (rpcReturn.data && storeConfig.useStore && storeConfig.dataState) {
        returnData = rpcReturn.data
        storeConfig.dataState.set(returnData)
    }


    if (loadingConfig.useLoading && loadingConfig.loadingState) {
        loadingStopped(loadingConfig.loadingState)
    }
    return signal(rpcReturn);
}
