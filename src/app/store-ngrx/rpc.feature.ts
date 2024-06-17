import {signalStoreFeature, withMethods} from "@ngrx/signals";
import {AuthenticatedSchema} from "../../../supabase/types/supabase.authenticated.shorthand-types";
import {PostgrestResponseFailure, PostgrestResponseSuccess} from "@supabase/postgrest-js";
import {DatabaseAuthenticatedOverwritten} from "../../../supabase/types/supabase.authenticated.modified";
import {supabaseAuthenticatedClient} from "../auth/supabase-authenticated-client";

export function withRpc(rpcCall: keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions']) {
    const client = supabaseAuthenticatedClient;
    return signalStoreFeature(
        withMethods((store) => {
            return {
                async rpc<
                    FunctionName extends string & keyof AuthenticatedSchema['Functions'],
                    Function_ extends AuthenticatedSchema['Functions'][FunctionName]
                >(
                    fn: FunctionName,
                    args: Function_['Args'] = {},
                    options?: {
                        head?: boolean
                        count?: 'exact' | 'planned' | 'estimated'
                    }
                ): Promise<PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]> | PostgrestResponseFailure> {
                    const rpcReturn: PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]> | PostgrestResponseFailure = await client.rpc(fn, args, options);
                    return rpcReturn;
                }
            }
        })
    )
}
