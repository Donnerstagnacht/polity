import {AuthenticatedSchema} from '../../../supabase/types/supabase.authenticated.shorthand-types';
import {PostgrestResponseFailure, PostgrestResponseSuccess} from '@supabase/postgrest-js';
import {DatabaseAuthenticatedOverwritten} from '../../../supabase/types/supabase.authenticated.modified';
import {loadingStarted, loadingStopped} from '../loadingFeature';
import {Signal, signal} from '@angular/core';
import {showAlert} from '../alertFeature';
import {updateErrorGlobal} from '../errorFeature';
import {rpcArray} from './rpcArrayFeature';
import {
    ArrayStoreConfig,
    ErrorConfig,
    ExtractImgUrlConfig,
    LoadingConfig,
    SuccessConfig,
    SupabaseConfig
} from '../types/rpc.type';
import {getSignedUrlFromSupabaseArray} from '@polity-signal-store/imageFeature';

/**
 * Asynchronously handles a Supabase RPC array function call by performing the following steps:
 * 1. Checks if loading is enabled and starts the loading state if provided.
 * 2. Calls the `rpcArray` function with the provided `supabaseConfig` and stores the result.
 * 3. If an error occurred during the RPC call, checks if error handling is enabled and updates the global error state if provided.
 * 4. If a success message is provided and no error occurred, shows an alert with the provided alert service and success message.
 * 5. If the RPC call was successful and data storage is enabled, stores the returned data in the provided data state.
 * 6. If loading is enabled, stops the loading state if provided.
 *
 * @param {SupabaseConfig<FunctionName, Function_>} supabaseConfig - The Supabase configuration object containing the function name, arguments, and options.
 * @param {LoadingConfig} [loadingConfig={useLoading: false}] - The loading configuration object.
 * @param {ArrayStoreConfig<FunctionName>} [storeConfig={useStore: false}] - The store configuration object.
 * @param {ErrorConfig} [errorConfig={useError: false}] - The error configuration object.
 * @param {SuccessConfig} [successConfig={useSuccess: false}] - The success configuration object.
 * @return {Signal<PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']> | PostgrestResponseFailure>} A signal of the RPC call result.
 */
export async function rpcArrayHandler<
    FunctionName extends string & keyof AuthenticatedSchema['Functions'],
    Function_ extends AuthenticatedSchema['Functions'][FunctionName],
>(
    supabaseConfig: SupabaseConfig<FunctionName, Function_>,
    loadingConfig: LoadingConfig = {
        useLoading: false
    },
    storeConfig: ArrayStoreConfig<FunctionName> = {
        useStore: false
    },
    errorConfig: ErrorConfig = {
        useError: false
    },
    successConfig: SuccessConfig = {
        useSuccess: false
    },
    extractImageConfig: ExtractImgUrlConfig<FunctionName> = {
        useExtractImgUrl: false
    }
): Promise<Signal<PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']> | PostgrestResponseFailure>> {
    if (loadingConfig.useLoading && loadingConfig.loadingState) {
        loadingStarted(loadingConfig.loadingState);
    }
    const rpcReturn: PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']> | PostgrestResponseFailure = await rpcArray(
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

    if (extractImageConfig.useExtractImgUrl && extractImageConfig.key && extractImageConfig.bucket && !rpcReturn.error) {
        rpcReturn.data = await getSignedUrlFromSupabaseArray<FunctionName>(
            rpcReturn.data,
            extractImageConfig.bucket,
            extractImageConfig.key
        );
    }

    let returnData = storeConfig.defaultReturn;
    if (!rpcReturn.error && storeConfig.useStore && storeConfig.dataState) {
        returnData = rpcReturn.data;
        storeConfig.dataState.set(returnData);
    }

    if (loadingConfig.useLoading && loadingConfig.loadingState) {
        loadingStopped(loadingConfig.loadingState);
    }
    return signal(rpcReturn);
}
