import {
    AuthenticatedSchema,
    SupabaseObjectReturn
} from '../../../supabase/types/supabase.authenticated.shorthand-types';
import {WritableSignal} from '@angular/core';
import {DatabaseAuthenticatedOverwritten} from '../../../supabase/types/supabase.authenticated.modified';
import {TuiAlertService} from '@taiga-ui/core';
import {ErrorStoreService} from '../error-store.service';
import {LoadingState} from './loadingState.type';

export type SupabaseConfig<
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

export type LoadingConfig = {
    useLoading?: boolean
    loadingState?: WritableSignal<LoadingState>
}

export type ArrayStoreConfig<FunctionName extends string & keyof AuthenticatedSchema['Functions']> = {
    useStore?: boolean
    dataState?: WritableSignal<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']>
    defaultReturn?: DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns'] | [] | {}
}

export type ObjectStoreConfig<FunctionName extends string & keyof AuthenticatedSchema['Functions']> = {
    useStore?: boolean
    dataState?: WritableSignal<SupabaseObjectReturn<FunctionName>>
    defaultReturn?: SupabaseObjectReturn<FunctionName>
}

export type SuccessConfig = {
    useSuccess?: boolean
    alertService?: TuiAlertService,
    successMessage?: string
}

export type ErrorConfig = {
    useError?: boolean
    errorStoreService?: ErrorStoreService
}

export type ExtractImgUrlConfig<FunctionName extends string & keyof AuthenticatedSchema['Functions']> = {
    useExtractImgUrl?: boolean
    key?: keyof SupabaseObjectReturn<FunctionName>,
    bucket?: string
}
