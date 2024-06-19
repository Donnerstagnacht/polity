import {
    AuthenticatedSchema,
    SupabaseObjectReturn
} from '../../../../supabase/types/supabase.authenticated.shorthand-types';
import {PostgrestResponseFailure, PostgrestResponseSuccess} from '@supabase/postgrest-js';
import {loadingStarted, loadingStopped} from '../loadingFeature';
import {signal} from '@angular/core';
import {showAlert} from '../alertFeature';
import {updateErrorGlobal} from '../errorFeature';
import {rpcObject} from './rpcObjectFeature';
import {ErrorConfig, LoadingConfig, ObjectStoreConfig, SuccessConfig, SupabaseConfig} from '../types/rpc.type';

/**
 * Asynchronously handles a Supabase RPC object function call by performing the following steps:
 * 1. Checks if loading is enabled and starts the loading state if provided.
 * 2. Calls the `rpcObject` function with the provided `supabaseConfig` and stores the result.
 * 3. If an error occurred during the RPC call, checks if error handling is enabled and updates the global error state if provided.
 * 4. If a success message is provided and no error occurred, shows an alert with the provided alert service and success message.
 * 5. If the RPC call was successful and data storage is enabled, stores the returned data in the provided data state.
 * 6. If loading is enabled, stops the loading state if provided.
 * 7. Returns a signal of the RPC call result.
 *
 * @param {SupabaseConfig<FunctionName, Function_>} supabaseConfig - The Supabase configuration object containing the function name, arguments, and options.
 * @param {LoadingConfig} [loadingConfig={useLoading: false}] - The loading configuration object.
 * @param {ObjectStoreConfig<FunctionName>} [storeConfig={useStore: false}] - The store configuration object.
 * @param {ErrorConfig} [errorConfig={useError: false}] - The error configuration object.
 * @param {SuccessConfig} [successConfig={useSuccess: false}] - The success configuration object.
 * @return {Signal<PostgrestResponseSuccess<SupabaseObjectReturn<FunctionName>> | PostgrestResponseFailure>} A signal of the RPC call result.
 */
export async function rpcObjectHandler<
    FunctionName extends string & keyof AuthenticatedSchema['Functions'],
    Function_ extends AuthenticatedSchema['Functions'][FunctionName],
>(
    supabaseConfig: SupabaseConfig<FunctionName, Function_>,
    loadingConfig: LoadingConfig = {
        useLoading: false
    },
    storeConfig: ObjectStoreConfig<FunctionName> = {
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
        loadingStarted(loadingConfig.loadingState);
    }
    const rpcReturn: PostgrestResponseSuccess<SupabaseObjectReturn<FunctionName>> | PostgrestResponseFailure = await rpcObject(
        supabaseConfig.fn,
        supabaseConfig.args,
        supabaseConfig.options
    );

    if (errorConfig.useError && errorConfig.errorStoreService && rpcReturn.error) {
        updateErrorGlobal(
            rpcReturn.error.message,
            true,
            errorConfig.errorStoreService
        );
    }

    if (successConfig.useSuccess && successConfig.alertService && !rpcReturn.error) {
        showAlert(
            successConfig.alertService,
            successConfig.successMessage
        );
    }

    // let returnData: SupabaseObjectReturn<FunctionName>// = storeConfig.defaultReturn;
    if (rpcReturn.data && storeConfig.useStore && storeConfig.dataState) {
        storeConfig.dataState.set(rpcReturn.data);
    }

    if (loadingConfig.useLoading && loadingConfig.loadingState) {
        loadingStopped(loadingConfig.loadingState);
    }
    return signal(rpcReturn);
}
