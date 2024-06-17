import {
    AuthenticatedSchema,
    SupabaseObjectReturn
} from "../../../supabase/types/supabase.authenticated.shorthand-types";
import {PostgrestResponseFailure, PostgrestResponseSuccess} from "@supabase/postgrest-js";
import {loadingStarted, LoadingState, loadingStopped} from "./loadingFeature";
import {signal, WritableSignal} from "@angular/core";
import {showAlert} from "./alertFeature";
import {TuiAlertService} from "@taiga-ui/core";
import {updateErrorGlobal} from "./errorFeature";
import {rpcArray} from "./rpcArrayFeature";
import {ErrorStoreService} from "../signal-store/error-store.service";
import {rpcObject} from "./rpcObjectFeature";

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
    dataState?: WritableSignal<SupabaseObjectReturn<FunctionName> | null>
    defaultReturn?: SupabaseObjectReturn<FunctionName>
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

export async function rpcObjectHandler<
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
    const rpcReturn: PostgrestResponseSuccess<SupabaseObjectReturn<FunctionName>> | PostgrestResponseFailure = await rpcObject(
        supabaseConfig.fn,
        supabaseConfig.args,
        supabaseConfig.options
    )
    console.log('rpcReturn', rpcReturn)

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


    // const test: PostgrestResponseSuccess<SupabaseObjectReturn<FunctionName>> | null = rpcReturn.data

    // let returnData: SupabaseObjectReturn<FunctionName>// = storeConfig.defaultReturn;
    if (rpcReturn.data && storeConfig.useStore && storeConfig.dataState) {
        // const test: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName] extends {
        //     Returns: infer R
        // } ? (R extends any[] ? R[number] : R) : never = rpcReturn.data
        const test3: NonNullable<SupabaseObjectReturn<FunctionName>> = rpcReturn.data
        // returnData = rpcReturn.data
        storeConfig.dataState.set(test3)
        // storeConfig.dataState.set(rpcReturn.data)
    }

    if (loadingConfig.useLoading && loadingConfig.loadingState) {
        loadingStopped(loadingConfig.loadingState)
    }
    return signal(rpcReturn);
}
