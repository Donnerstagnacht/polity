import {patchState, SignalStoreFeature, signalStoreFeature, withMethods, withState} from "@ngrx/signals";
import {withLoading} from "./loading.feature";
import {DatabaseAuthenticatedOverwritten} from "../../../supabase/types/supabase.authenticated.modified";
import {withRpc} from "./rpc.feature";
import {withError} from "./error.feature";
import {withAlert} from "./alert.feature";
import {AuthenticatedSchema} from "../../../supabase/types/supabase.authenticated.shorthand-types";
import {PostgrestResponseFailure, PostgrestResponseSuccess} from "@supabase/postgrest-js";


export interface rpcOptions<Prop> {
    prefix: Prop;
}

export type PrefixedRpcState<Prop extends string, FunctionName extends keyof DatabaseAuthenticatedOverwritten["authenticated"]["Functions"]> = {
    [K in Prop as `${K}Data`]: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]
};

export type PrefixedCRpcHandlerMethods<Prop extends string, FunctionName extends keyof DatabaseAuthenticatedOverwritten["authenticated"]["Functions"], Function_ extends DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]> = {
    [K in Prop as `${K}RpcCall`]: (
        fn: FunctionName,
        args: Function_['Args'],
        useSuccess?: boolean,
        successMessage?: string,
        useLoading?: boolean,
        useError?: boolean,
        options?: {
            head?: boolean
            count?: 'exact' | 'planned' | 'estimated'
        }
    ) => PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]> | PostgrestResponseFailure;
};


type prefixedState<FunctionName extends keyof DatabaseAuthenticatedOverwritten["authenticated"]["Functions"], Prop extends string> = {
    // response: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"] | null
    [K in Prop as `${K}data`]: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]
}

export function withRpcHandlerWithPrefix<FunctionName extends keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions'], Prop extends string>(
    rpcCall: keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions'],
    initiateWith: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"],
    options: rpcOptions<Prop>
): SignalStoreFeature<
    {
        state: {};
        signals: {};
        methods: {};
    },
    {
        state: PrefixedRpcState<Prop, FunctionName>;
        signals: {};
        methods: PrefixedCRpcHandlerMethods<Prop, FunctionName, DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]>;
    }
>;

export function withRpcHandlerWithPrefix<FunctionName extends keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions'], Prob extends string>(
    rpcCall: keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions'],
    initiateWith: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"],
    options: rpcOptions<Prob>
) {
    const dataKey = `${options.prefix}data`;
    const copyKey = `${options.prefix}Copy`;

    // const initialState: state<FunctionName> = {
    //     test: initiateWith
    // }
    //
    // const prefixedInitialState: prefixedState<FunctionName, Prob> = {
    //     [textKey]: initiateWith
    // }

    return signalStoreFeature(
        withState({
            [dataKey]: initiateWith,
            loading: false
        }),


        withLoading(),
        withRpc(rpcCall),
        withError(),
        withAlert(),

        withMethods((store) => {

            return {

                async rpcHandler<
                    FunctionName extends string & keyof AuthenticatedSchema['Functions'],
                    Function_ extends AuthenticatedSchema['Functions'][FunctionName]
                >(
                    fn: FunctionName,
                    args: Function_['Args'] = {},
                    useSuccess: boolean = true,
                    successMessage: string = 'Successful Update!',
                    useLoading: boolean = true,
                    useError: boolean = true,
                    options?: {
                        head?: boolean
                        count?: 'exact' | 'planned' | 'estimated'
                    }
                ) {
                    if (useLoading) {
                        store.startLoading()
                        store.requestData()
                    }
                    const rpcReturn: PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]> | PostgrestResponseFailure = await store.rpc(
                        fn,
                        args,
                        options
                    )

                    const rpcReturnData: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"] = rpcReturn.data
                    if (rpcReturn.data) {
                        const data: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"] = rpcReturn.data
                        patchState(store, {
                            [dataKey]: data
                        })
                    } else {
                        patchState(store, {[dataKey]: initiateWith})
                    }

                    if (useError && rpcReturn.error) {
                        store.updateError(
                            rpcReturn.error.message,
                            true
                        )
                    }

                    if (useSuccess && !rpcReturn.error) {
                        store.showAlert(
                            successMessage
                        )
                    }

                    if (useLoading) {
                        store.stopLoading()
                    }
                    return rpcReturn;
                }
            }
        })
    )
}


export type state2<FunctionName extends keyof DatabaseAuthenticatedOverwritten["authenticated"]["Functions"]> = {
    // response: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"] | null
    data: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]

}


export function withRpcHandler<FunctionName extends keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions']>(
    rpcCall: keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions'],
    initiateWith: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"],
    createSignalState: boolean = true
) {
    const initialState: state2<FunctionName> = {
        data: initiateWith
    }

    return signalStoreFeature(
        withState(initialState),

        withLoading(),
        withRpc(rpcCall),
        withError(),
        withAlert(),

        withMethods((store) => {

            return {

                async rpcHandler<
                    FunctionName extends string & keyof AuthenticatedSchema['Functions'],
                    Function_ extends AuthenticatedSchema['Functions'][FunctionName]
                >(
                    fn: FunctionName,
                    args: Function_['Args'] = {},
                    useSuccess: boolean = true,
                    successMessage: string = 'Successful Update!',
                    useLoading: boolean = true,
                    useError: boolean = true,
                    options?: {
                        head?: boolean
                        count?: 'exact' | 'planned' | 'estimated'
                    }
                ) {
                    if (useLoading) {
                        store.startLoading()
                        store.requestData()
                    }
                    const rpcReturn: PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]> | PostgrestResponseFailure = await store.rpc(
                        fn,
                        args,
                        options
                    )

                    const rpcReturnData: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"] = rpcReturn.data
                    if (rpcReturn.data) {
                        const data: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"] = rpcReturn.data
                        patchState(store, {
                            data: data
                        })
                    } else {
                        patchState(store, {data: initiateWith})
                    }

                    if (useError && rpcReturn.error) {
                        store.updateError(
                            rpcReturn.error.message,
                            true
                        )
                    }

                    if (useSuccess && !rpcReturn.error) {
                        store.showAlert(
                            successMessage
                        )
                    }

                    if (useLoading) {
                        store.stopLoading()
                    }
                    return rpcReturn;
                }
            }
        })
    )
}

//
// type state<FunctionName extends keyof DatabaseAuthenticatedOverwritten["authenticated"]["Functions"]> = {
//     // response: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"] | null
//     data: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]
//
// }
//
//
// export function withRpcHandler<FunctionName extends keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions']>(
//     rpcCall: keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions'],
//     initiateWith: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]
// ) {
//     const initialState: state<FunctionName> = {
//         data: initiateWith
//     }
//
//     return signalStoreFeature(
//         withState(initialState),
//
//         withLoading(),
//         withRpc(rpcCall),
//         withError(),
//         withAlert(),
//
//         withMethods((store) => {
//
//             return {
//
//                 async rpcHandler<
//                     FunctionName extends string & keyof AuthenticatedSchema['Functions'],
//                     Function_ extends AuthenticatedSchema['Functions'][FunctionName]
//                 >(
//                     fn: FunctionName,
//                     args: Function_['Args'] = {},
//                     useSuccess: boolean = true,
//                     successMessage: string = 'Successful Update!',
//                     useLoading: boolean = true,
//                     useError: boolean = true,
//                     options?: {
//                         head?: boolean
//                         count?: 'exact' | 'planned' | 'estimated'
//                     }
//                 ) {
//                     if (useLoading) {
//                         store.startLoading()
//                         store.requestData()
//                     }
//                     const rpcReturn: PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]> | PostgrestResponseFailure = await store.rpc(
//                         fn,
//                         args,
//                         options
//                     )
//
//                     const rpcReturnData: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"] = rpcReturn.data
//                     if (rpcReturn.data) {
//                         const data: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"] = rpcReturn.data
//                         patchState(store, {
//                             data: data
//                         })
//                     } else {
//                         patchState(store, {data: initiateWith})
//                     }
//
//                     if (useError && rpcReturn.error) {
//                         store.updateError(
//                             rpcReturn.error.message,
//                             true
//                         )
//                     }
//
//                     if (useSuccess && !rpcReturn.error) {
//                         store.showAlert(
//                             successMessage
//                         )
//                     }
//
//                     if (useLoading) {
//                         store.stopLoading()
//                     }
//                     return rpcReturn;
//                 }
//             }
//         })
//     )
// }

