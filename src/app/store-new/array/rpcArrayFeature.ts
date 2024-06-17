import {AuthenticatedSchema} from "../../../supabase/types/supabase.authenticated.shorthand-types";
import {PostgrestResponseFailure, PostgrestResponseSuccess} from "@supabase/postgrest-js";
import {DatabaseAuthenticatedOverwritten} from "../../../supabase/types/supabase.authenticated.modified";
import {supabaseAuthenticatedClient} from "../auth/supabase-authenticated-client";

export async function rpcArray<
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

    const client = supabaseAuthenticatedClient;
    let rpcReturn: PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten["authenticated"]["Functions"][FunctionName]["Returns"]> | PostgrestResponseFailure = await client.rpc(fn, args, options);
    return rpcReturn;
}
