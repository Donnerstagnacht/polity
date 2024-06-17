import {patchState, signalStoreFeature, withMethods, withState} from "@ngrx/signals"
import {DatabaseAuthenticatedOverwritten} from "../../../supabase/types/supabase.authenticated.modified"
import {withRpcHandlerNoState} from "./rpcHandlerNoState.feature"

type ElementType<T> = T extends (infer U)[] ? U : T;
type FunctionKey<T extends keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions']> = keyof ElementType<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][T]["Returns"]>
type TestType = keyof ElementType<DatabaseAuthenticatedOverwritten['authenticated']['Functions']['read_profile_counters']["Returns"]>
type KeyOfReturnedData = keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions']['read_profile_counters']["Returns"]

export type state2<FunctionName extends keyof DatabaseAuthenticatedOverwritten["authenticated"]["Functions"]> = {
    // response: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"] | null
    data: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]

}

export function withCounter<FunctionName extends keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions']>(
    rpcCall: keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions'],
    initiateWith: DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]
) {
    const initialState: state2<FunctionName> = {
        data: initiateWith
    }

    return signalStoreFeature(
        withState(initialState),

        withRpcHandlerNoState<FunctionName>(rpcCall),

        withMethods((store) => {

            return {
                load() {
                    const results = store.rpcHandler(rpcCall);
                    patchState(store, {data: results})
                },

                increment(key: FunctionKey<FunctionName>) {
                    console.log(store, store[key])
                    patchState(store, {[key]: store[key]() + 1})
                },

                decrement(key: keyof state2<FunctionName>) {
                    patchState(store, {[key]: store[key]() - 1})
                },
            }
        })
    )
}
